import React from "react"

//components
import Lolly from "../components/lolly"

//styling
import "./styles.css"

export default function App() {
  const [cl1, setCl1] = React.useState<string>("#ae7d8f")
  const [cl2, setCl2] = React.useState<string>("#3aef4e")
  const [cl3, setCl3] = React.useState<string>("#a79c5d")

  const toField = React.useRef(null)
  const msgField = React.useRef(null)
  const fromField = React.useRef(null)

  const handleSubmit = () => {
      const toRef = toField.current;
    console.log(toRef.value)
  }

  return (
    <div className="App">
      <h2>Create Lolly</h2>
      <div className="main-container">
        <div className="lolly-container">
          <div>
            <Lolly top={cl1} middle={cl2} bottom={cl3} />
          </div>
          <div>
            <input
              type="color"
              value={cl1}
              onChange={e => setCl1(e.target.value)}
            />
            <input
              type="color"
              value={cl2}
              onChange={e => setCl2(e.target.value)}
            />
            <input
              type="color"
              value={cl3}
              onChange={e => setCl3(e.target.value)}
            />
          </div>
        </div>
        <div className="form-container">
          <input type="text" placeholder="Enter recipient" ref={toField} />
          <textarea placeholder="Enter your message" ref={msgField} />
          <input type="text" placeholder="Enter sender name" ref={fromField} />
          <button onClick={handleSubmit}>Send Lolly</button>
        </div>
      </div>
    </div>
  )
}
