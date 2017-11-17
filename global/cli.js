const Module = require('module')

// when current working directory is `.../local/`
console.log(`
  process.cwd()
  `, process.cwd()
)

// I would expect this to be `['.../local/node_modules', '.../node_modules', ...]`
console.log(`
  require.resolve.paths(process.cwd())
  `, require.resolve.paths(process.cwd())
)

// I would expect this relative path to produce the same output as the absolute path above
console.log(`
  require.resolve.paths('../local')
  `, require.resolve.paths('../local')
)

// I would expect this to load dep from `local`
console.log(`
  require.resolve('dep', {paths: [process.cwd()]})
  `, require.resolve('dep', {paths: [process.cwd()]})
)

// This more like it
console.log(`
  Module._nodeModulePaths(process.cwd())
  `, Module._nodeModulePaths(process.cwd())
)

// This is what I want
console.log(`
  Module._findPath('dep', Module._nodeModulePaths(process.cwd()), false)
  `, Module._findPath('dep', Module._nodeModulePaths(process.cwd()), false)
)
