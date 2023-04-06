import React from 'react'

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
    console.log("coord", coord)
   
    return (coord % 3)
    
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    this.setState({...this.state, message: initialMessage});
    this.setState({...this.state, email: initialEmail});
    this.setState({...this.state, index: initialIndex});
    this.setState({...this.state, steps: initialSteps});
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let rowChange = false;
    // console.log(direction)
    let index = this.state.index
    let newIndex = index
    
    // console.log(newIndex)
    if(direction === "up") {
      rowChange = true;
      newIndex = newIndex - 3
      // Object.assign({newXY: (newIndex -= 3)})
      // newIndex -= 3
    }
    if(direction === "down") {
      rowChange = true
      newIndex = newIndex + 3
      // Object.assign({newXY: (newIndex += 3)})
      // newIndex += 3
    }
    
    if(direction === "left") {
      newIndex--
      // Object.assign({newXY: (newIndex --)})
      // newIndex--
    }
    if(direction === "right") {
      newIndex++
      // Object.assign({newXY: (newIndex ++)})
      // newIndex++
    }
    // Object.assign({newXY: newIndex})

    // console.log(rowChange)
    console.log("new", newIndex)
    return newIndex
  }

  move = (evt) => {
    
    let newIdx = this.getNextIndex(evt.target.id);
    this.setState({...this.state, index: newIdx})
    let newXY = this.getXY(newIdx);
    // console.log(newXY)
    console.log("Move" ,  newIdx)
    console.log("newXY",newXY)
    return newIdx
    
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    if(evt.target.id === "reset") {
      this.reset
      console.log(this.state)
    }
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
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved {initialSteps} times</h3>
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
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.onChange}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit" onSubmit={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
