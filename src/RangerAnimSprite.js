import * as BABYLON from 'babylonjs'
import Ranger from './sprites/ranger-anim-alpha.png'

const AnimSprite = (scene) => {
  let spriteManager = new BABYLON.SpriteManager("manager", Ranger, 10, {width: 64, height: 64}, scene)
  var player = new BABYLON.Sprite("player", spriteManager)
  player.playAnimation(10, 25, true, 15)
  player.position.z = 0.7
  player.position.y = 0.5
  return player
}

export default AnimSprite
