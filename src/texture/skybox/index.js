const keysInOrder = ['skybox_px', 'skybox_py', 'skybox_pz', 'skybox_nx', 'skybox_ny', 'skybox_nz']

const requireAll = ctx => {
  let keys = keysInOrder.map(name => './' + name + '.jpg')
  return keys.map(ctx)
}

let imports = requireAll(require.context("./", false, /^\.\/.*\.jpg$/))

export default imports
