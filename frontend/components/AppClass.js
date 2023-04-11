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
let steps = initialSteps;
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

  

  getXY = (coord) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
   first = (first * 0) + (coord % 3) + 1
   second = (second * 0) + (Math.floor(coord / 3) + 1)
   
   return [first, second]
   
    
    
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    steps = initialSteps
    this.setState({index: initialIndex})
    
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let rowChange = false;
    // console.log(direction)
    let index = this.state.index
    let newIndex = index
    

   if(direction === "reset") {
    newIndex = 4
    steps = initialSteps
    console.log(newIndex)
    this.setState({email: initialEmail})
   }
   
    if(direction === "up") {
      if(newIndex === 0 || newIndex === 1 || newIndex ===2) {
        newIndex = newIndex
      } else {
        rowChange = true;
        steps++
        newIndex = newIndex - 3
      }
      
      // Object.assign({newXY: (newIndex -= 3)})
      // newIndex -= 3
    }
    if(direction === "down") {
      if(newIndex === 6 || newIndex === 7 || newIndex === 8) {
        newIndex = newIndex
      } else {
        rowChange = true
        steps++
        newIndex = newIndex + 3
      }
      
      // Object.assign({newXY: (newIndex += 3)})
      // newIndex += 3
    }
    
    if(direction === "left") {
      if(newIndex === 0 || newIndex === 3 || newIndex === 6) {
        newIndex = newIndex
      } else {
        steps++
        newIndex--
      }
      
      // Object.assign({newXY: (newIndex --)})
      // newIndex--
    }
    if(direction === "right") {
      if(newIndex === 2 || newIndex === 5 || newIndex === 8) {
        newIndex = newIndex
      } else {
        steps++
        newIndex++
      }
      
      
    }
    
    return newIndex
  }

  move = (evt) => {
    
    let newIdx = this.getNextIndex(evt.target.id);
    this.setState({...this.state, index: newIdx})
    let newXY = this.getXY(newIdx);
    
    // console.log(newXY)
    console.log("Move" ,  newIdx)
    console.log("newXY", newXY)
    return newIdx
    
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // if(evt.target.id === "reset") {
    //   this.reset
    //   steps = initialSteps
    //   this.setState({index: initialIndex})
      // console.log(this.state.index)
    // }
    evt.preventDefault();
    let newInput = evt.target.value
    this.setState({...this.state.email, email: newInput});
    
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
          <h3 id="coordinates">Coordinates ({first}, {second})</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message" value={this.state.message}></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.move}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit" onSubmit={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
