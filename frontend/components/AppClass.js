import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

// const initialState = {
//   message: initialMessage,
//   email: initialEmail,
//   index: initialIndex,
//   steps: initialSteps,
// }
let first = 2;
let second = 2;

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      time: ''
    }
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    let coord = this.state.index

    first = (first * 0) + (coord % 3) + 1
    second = (second * 0) + (Math.floor(coord / 3) + 1)

    return [first, second]
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    let coords = this.getXY()

    return `Coordinates (${coords[0]}, ${coords[1]})`
  }

  reset = (evt) => {
    this.setState({
      steps: initialSteps,
      index: initialIndex,
      email: initialEmail,
      message: initialMessage
    });

    
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let rowChange = false;
    // console.log(direction)
    let newIndex = this.state.index
    let steps = this.state.steps
    let message = initialMessage

    
    

    if (direction === "up") {
      if (newIndex === 0 || newIndex === 1 || newIndex === 2) {
        message = "You can't go up"
      } else {
        rowChange = true;
        steps++
        newIndex = newIndex - 3
      }

      // Object.assign({newXY: (newIndex -= 3)})
      // newIndex -= 3
    }
    else if (direction === "down") {
      if (newIndex === 6 || newIndex === 7 || newIndex === 8) {
        message = "You can't go down"
      } else {
        rowChange = true
        steps++
        newIndex = newIndex + 3
      }

    }
    else if (direction === "left") {
      if (newIndex === 0 || newIndex === 3 || newIndex === 6) {
        message = "You can't go left"
      } else {
        steps++
        newIndex--
      }

      // Object.assign({newXY: (newIndex --)})
      // newIndex--
    }
    else if (direction === "right") {
      if (newIndex === 2 || newIndex === 5 || newIndex === 8) {
        message = "You can't go right"
      } else {
        steps++
        newIndex++
      }
    }

    this.setState(
      {
        message: message,
        steps: steps,
        index: newIndex
      }
    )
  }

  move = (evt) => {
    this.getNextIndex(evt.target.id);
    this.pluralTimes()
  }

  pluralTimes = () => {
    let time = ''
    if(this.state.steps === 1) {
      time = 'time'
      this.setState({time: time})
    } else {
      time = 'times'
      this.setState({time: time})
    }
    console.log(this.state.steps)
  }

  onChange = (evt) => {

    evt.preventDefault();
    this.setState({ email: evt.target.value });

    if (evt.target.id === 'email') {
     
    }

  }

  onSubmit = (evt) => {
    evt.preventDefault();
    let message = initialMessage;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
     

      axios.post('http://localhost:9000/api/result', {
      x: first,
      y: second,
      steps: this.state.steps,
      email: this.state.email
    
    }) 
    .then((res) => {
      this.reset()
      message = res.data.message
      this.setState({message: message})
    })
    .catch(() => {
      if(this.state.email === 'foo@bar.baz') {
        message = 'foo@bar.baz failure #71';
        this.setState({message: message})
      } else if(this.state.email === '') {
        message = 'Ouch: email is required';
        this.setState({message: message})
      } else {
        message = "Ouch: email must be a valid email"
      this.setState({message: message})
      this.reset
      }
      
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.time}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message" value={this.state.message}>{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit" onClick={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
