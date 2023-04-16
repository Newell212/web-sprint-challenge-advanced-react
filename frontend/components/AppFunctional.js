import React, {useState} from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  const [time, setTime] = useState('times')

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let coord = index

    first = (first * 0) + (first % 3) + 1
    second = (second * 0) + (Math.floor(coord / 3) + 1)

    return [first, second]
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // let coords = getXY();

    // return `(${coords[0], coords[1]})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let newSteps = steps;
    let newIndex = index;
    let newMessage = "";
    let times = '';

    if(direction === 'up') {
      if(index === 0 || index === 1 || index === 2) {
        // setMessage(initialMessage)
       newMessage = "You can't go up"
      //  setMessage(newMessage)
      } else {
        newSteps++
        newIndex = newIndex - 3
        // setSteps(newSteps)
        // setIndex(newIndex)
      }
    }

    else if(direction === 'right') {
      if(index === 2 || index === 5 || index === 8) {
        // setMessage(initialMessage)
        newMessage = "You can't go right"
        // setMessage(newMessage)
      } else {
        newSteps++
        newIndex++
        // setSteps(newSteps)
        // setIndex(newIndex)
      }
    }

    else if(direction === 'left') {
      if(index === 0 || index === 3 || index === 6) {
        // setMessage(initialMessage)
        newMessage = "You can't go left"
        // setMessage(newMessage)
      } else {
        newSteps++
        newIndex--
        // setSteps(newSteps)
        // setIndex(newIndex)
      }
    }

   else if(direction === 'down') {
      if(index === 6 || index === 7 || index === 8) {
        // setMessage(initialMessage)
        newMessage = "You can't go down"
        // setMessage(newMessage)
      } else {
        newSteps++
        newIndex = newIndex + 3
        // setSteps(newSteps)
        // setIndex(newIndex)
      }
    }
    
    if(steps === 0) {
      times = 'time'
    } else {
      times = 'times'
    }
    
    
    
    setSteps(newSteps)
    setIndex(newIndex)
    setMessage(newMessage)
    setTime(times)
    console.log("message" , message)
    console.log("steps" , steps)
    console.log("index" , index)
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex(evt.target.id)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {}</h3>
        <h3 id="steps">You moved {steps} {time}</h3>
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
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
