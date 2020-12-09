import React from "react"
import { Link } from "gatsby"

import Lolly from "../components/lolly"

import "./styles.css"

export default function App() {
  return (
    <div>
      <h1>Virtual Lolly for all!</h1>
      <h3>Create Virtual Lollies and send to someone</h3>
      <Link
        style={{
          background: "#e4717a",
          color: "white",
          padding: "5px 10px",
          textDecoration: "none",
          borderRadius: "5px",
        }}
        to="/create_lolly"
      >
        Create new lolly
      </Link>
      <div style={{ padding: "10px" }}>
        <Lolly top="#ae7f9c" bottom="#6a6bc2" middle="#77aa8e" />
      </div>
    </div>
  )
}
