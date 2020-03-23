const { environment } = require('@rails/webpacker')

// https://github.com/mapbox/mapbox-gl-js/issues/3422
const nodeModulesLoader = environment.loaders.get('nodeModules')

if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude = (nodeModulesLoader.exclude == null) ? [] : [nodeModulesLoader.exclude]
}
nodeModulesLoader.exclude.push(/mapbox-gl/)

module.exports = environment
