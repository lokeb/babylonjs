import * as BABYLON from 'babylonjs'
import EarthSurface from './texture/world.topo_1200x600.png'
import EarthHeightMap from './texture/worldheightmap.jpg'

const Earth = scene => {
  let material = new BABYLON.StandardMaterial("surface", scene)
  material.diffuseTexture = new BABYLON.Texture(EarthSurface)

  let surface = BABYLON.Mesh.CreateGroundFromHeightMap("heightMap", EarthHeightMap, 100, 50, 500, 0.1, 4, scene)
  surface.material = material

  return surface
}

export default Earth
