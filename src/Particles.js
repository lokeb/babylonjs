import * as BABYLON from 'babylonjs'

import Flare from './texture/flare.png'


const Particles = (scene, emitter) => {
  let system = new BABYLON.ParticleSystem("particles", 2000, scene)
  system.emitter = emitter
  system.particleTexture = new BABYLON.Texture(Flare, scene)

  system.minEmitBox = new BABYLON.Vector3(-1, -1, -1)
  system.maxEmitBox = new BABYLON.Vector3(1, 1, 1)

  system.emitRate = 500

  system.color1 = new BABYLON.Color4(1, 0.8, 0.3, 1)
  system.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 0.8)
  system.colorDead = new BABYLON.Color4(0.6, 0, 0.2, 0.0)

  system.minSize = 0.2
  system.maxSize = 1

  system.minLifeTime = 0.3
  system.maxLifeTime = 1.5

  system.gravity = new BABYLON.Vector3(0, -9.8, 0)

  system.direction1 = new BABYLON.Vector3(-7, 8, 3)
  system.direction2 = new BABYLON.Vector3(7, 8, -3)

  system.minAngularSpeed = 0
  system.maxAngularSpeed = Math.PI

  system.minEmitPower = 0.5
  system.maxEmitPower = 1
  system.updateSpeed = 0.005

  system.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE

  system.start()
  return system
}

export default Particles
