import React from 'react'
import * as BABYLON from 'babylonjs'
import { Engine, Scene, ArcRotateCamera, Vector3, AnaglyphArcRotateCamera, TGATools, ParticlesOptimization } from 'babylonjs'

import Skybox from './Skybox'
import RangerAnim from './RangerAnimSprite'
import Particles from './Particles'
import Earth from './Earth'

import './babylonApp.scss'

import Grass from './texture/grass.png'
import Bump from './texture/NormalMap.png'

class BabylonApp extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current
    this.engine = new Engine(this.canvas, true, {
      deterministicLockstep: true,
      lockstepMaxSteps: 4
    })

    this.scene = new Scene(this.engine)
    this.scene.ambientColor = new BABYLON.Color3(0.5, 0, 0.5)
    this.scene.clearColor = new BABYLON.Color4(0, 0.2, 0.4, 0.8)
    this.scene.gravity = new BABYLON.Vector3(0, -9.8, 0)
    this.scene.collisionsEnabled = true

    let camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene)
    camera.attachControl(this.canvas, true, false)
    camera.collisionRadius = new BABYLON.Vector3(1, 1, 1)
    camera.checkCollisions = true

    let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene)
    let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene)

    let skybox = Skybox(this.scene)

    let earth = Earth(this.scene)

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })

    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = ev => {
    this.engine.resize()
  }

  render() {
    return <canvas ref={this.canvasRef} id='babylon-canvas' />
  }
}

export default BabylonApp
