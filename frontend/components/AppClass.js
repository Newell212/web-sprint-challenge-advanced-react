import React from 'react'
// import '../styles/styles.css'
// import '../styles/reset.css'

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

    console.log(this.state)
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

    console.log("getNextIndex state: ")
    console.log(this.state)

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
  }

  onChange = (evt) => {

    evt.preventDefault();
    this.setState({ email: evt.target.value });

    if (evt.target.id === 'email') {
      console.log(evt.target.value)
    }

  }

  onSubmit = (evt) => {
    evt.preventDefault();
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
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
          <input id="submit" type="submit" onSubmit={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
