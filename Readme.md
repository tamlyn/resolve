# Understanding require.resolve.paths

I was excited to see the new [`require.resolve`](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_require_resolve_request_options) 
options and `require.resolve.paths`in Node 8.9 as it seems to address a need I (and many others) have. But it doesn't 
work as I was expecting. Maybe I'm not using it right or I've misunderstood the problem that it solves.

## What I want

```
.
├── global
│   ├── cli.js
│   └── node_modules
│       └── dep
│           └── index.js
└── local
   └── node_modules
       └── dep
           └── index.js
```

I want to invoke the `global` CLI from the `local` folder and have it load a dependency from the `local` `node_modules` 
instead of the global one.

## What I get

```
$ node ../global/cli.js

  process.cwd()
   /Users/tamlyn/resolve/local

  require.resolve.paths(process.cwd())
   [ '/Users/tamlyn/resolve/global/node_modules',
  '/Users/tamlyn/resolve/node_modules',
  '/Users/tamlyn/node_modules',
  '/Users/node_modules',
  '/node_modules',
  '/Users/tamlyn/.node_modules',
  '/Users/tamlyn/.node_libraries',
  '/usr/local/lib/node' ]

  require.resolve.paths('../local')
   [ '/Users/tamlyn/resolve/global' ]

  require.resolve('dep', {paths: [process.cwd()]})
   /Users/tamlyn/resolve/global/node_modules/dep/index.js

  Module._nodeModulePaths(process.cwd())
   [ '/Users/tamlyn/resolve/local/node_modules',
  '/Users/tamlyn/resolve/node_modules',
  '/Users/tamlyn/node_modules',
  '/Users/node_modules',
  '/node_modules' ]

  Module._findPath('dep', Module._nodeModulePaths(process.cwd()), false)
   /Users/tamlyn/resolve/local/node_modules/dep/index.js
```

## Try it

- Clone this repo
- `cd local`
- `node ../global/cli.js`