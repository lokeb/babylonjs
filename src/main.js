import React from "react"
import ReactDOM from "react-dom"
import BabylonApp from './BabylonApp'
import './app.scss'

class Main extends React.Component {
  render() {
    return (
      <div id="main-app">
        <h1>BabylonJS</h1>
        <BabylonApp/>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.body)
