import React from 'react'
import * as BABYLON from 'babylonjs'
import { Engine, Scene, ArcRotateCamera, Vector3, AnaglyphArcRotateCamera, TGATools } from 'babylonjs'

import Skybox from './Skybox'
import RangerAnim from './RangerAnimSprite'

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

    let camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene)
    camera.attachControl(this.canvas, true, false)

    let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene)
    let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.scene)

    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, this.scene)

    var box = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 1, depth: 0.125}, this.scene)
    // var plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, this.scene)
    // var ground = BABYLON.MeshBuilder.CreateGround("ground", {}, this.scene)
    let points = [
      new BABYLON.Vector3(0, 0, 0),
      new BABYLON.Vector3(0, 1, 1),
      new BABYLON.Vector3(0, 1, 0)
    ]

    // let lines = BABYLON.MeshBuilder.CreateDashedLines("lines", {points, dashSize: 0.5}, this.scene)

    this.scene.ambientColor = new BABYLON.Color3(0.5, 0, 0.5)
    this.scene.clearColor = new BABYLON.Color4(0, 0.2, 0.4, 0.8)

    let skybox = Skybox(this.scene)

    let material = new BABYLON.StandardMaterial("mat1", this.scene)
    material.diffuseColor = new BABYLON.Color3(0.6, 0.6, 1)
    material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.6)
    material.ambientColor = new BABYLON.Color3(0.2, 1, 0.2)
    material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5)
    material.diffuseTexture = new BABYLON.Texture(Grass, this.scene)
    material.bumpTexture = new BABYLON.Texture(Bump, this.scene)

    sphere.material = material

    let boxMat = new BABYLON.StandardMaterial('boxMat', this.scene)
    boxMat.ambientColor = new BABYLON.Color3(1, 1, 0)
    boxMat.specularColor = new BABYLON.Color3(1, 0, 1)
    boxMat.diffuseColor = new BABYLON.Color3(0, 0.5, 1)
    boxMat.emissiveColor = new BABYLON.Color3(0, 0.3, 0)
    boxMat.alpha = 0.7

    box.material = boxMat

    let animationSphere = new BABYLON.Animation("anim1", "rotation", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, true)
    let keysSphere = [
      {
        frame: 0,
        value: new BABYLON.Vector3(0, 0, 0),
      },
      {
        frame: 30,
        value: sphere.rotation.add(new BABYLON.Vector3(0.2, 0.2, 0.2)),
      }
    ]

    animationSphere.setKeys(keysSphere)

    sphere.animations = [animationSphere]
    this.scene.beginAnimation(sphere, 0, 30, true)

    let animationBox = new BABYLON.Animation("anim2", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, true)
    let keysBox = [
      {
        frame: 0,
        value: 0
      },
      {
        frame: 30,
        value: Math.PI/2
      }
    ]
    animationBox.setKeys(keysBox)

    box.animations = [animationBox]
    this.scene.beginAnimation(box, 0, 30, true)

    this.scene.gravity = new BABYLON.Vector3(0, -9.8, 0)
    this.scene.collisionsEnabled = true

    camera.collisionRadius = new BABYLON.Vector3(1, 1, 1)
    camera.checkCollisions = true

    sphere.checkCollisions = true
    box.checkCollisions = true

    let anim = RangerAnim(this.scene)

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
