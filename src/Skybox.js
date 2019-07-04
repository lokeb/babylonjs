import * as BABYLON from 'babylonjs'
import skytexts from './texture/skybox'

const Skybox = scene => {
  let skybox = BABYLON.Mesh.CreateBox("skybox", 100, scene)

  let material = new BABYLON.StandardMaterial("sky", scene)
  material.backFaceCulling = false
  material.disableLighting = true
  material.reflectionTexture = new BABYLON.CubeTexture("", scene, null, true, skytexts)
  material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
  material.diffuseColor = BABYLON.Color3.Black()
  material.specularColor = BABYLON.Color3.Black()

  skybox.material = material

  skybox.infiniteDistance = true

  return skybox
}

export default Skybox
