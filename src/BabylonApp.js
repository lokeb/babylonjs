import React from 'react'
import { Engine, Scene } from 'babylonjs'

class BabylonApp extends React.Component {
  render() {
    let engine = new Engine()
    let scene = new Scene(engine)
    return <h1>We have it</h1>
  }
}


export default BabylonApp
