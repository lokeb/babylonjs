import React from 'react'
import * as BABYLON from 'babylonjs'
import { Engine, Scene, ArcRotateCamera, Vector3 } from 'babylonjs'
import './babylonApp.scss'

class BabylonApp extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current
    this.engine = new Engine(this.canvas)
    this.scene = new Scene(this.engine)
    let camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
    camera.attachControl(this.canvas, true);

    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, this.scene);
    // this.engine.runRenderLoop(() => {
      this.scene.render();
    // })

    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = ev => {
    this.engine.resize()
    this.scene.render()
  }

  render() {
    return <canvas ref={this.canvasRef} id='babylon-canvas' />
  }
}

export default BabylonApp
