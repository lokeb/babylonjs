import React from "react"
import ReactDOM from "react-dom"
import BabylonApp from './BabylonApp'
import './test.scss'

class Main extends React.Component {
  render() {
    return (
      <span>
        <h1>BabylonJS</h1>
        <BabylonApp/>
      </span>
    )
  }
}

ReactDOM.render(<Main />, document.body)
