# NodeJS Starter

A custom [NodeJS](https://nodejs.org/) starter project with preconfigurations and examples to help you ship quality code early and often. 

- ### Components 

  | Component |  |
  |:--|:--|
  | [ECMAScript 6](#ecmascript-6) JavaScript | Babel precofigured |
  | [Express Server](#express-server) | See `src/app.js` |

- ### Code Quality 👌
  
  Jasmine is preconfigured and an example spec showing how to test Express apps is included. Just as important as testing but often forgotten is linitng. As author of _Clean Code_ Robert Martin wrote:

  > Consistent indentation style was one of the most statistically significant indicators of low bug density.

  | Tool |  |
  |:--|:--|
  | [ES6 Linter](#es6-linter) | Preconfigured with `.eslintrc` |
  | [Unit Specs with Jasmine](#unit-specs-with-jasmine) | Includes `app.spec.js` example for Express |

- ### Ship It 🚀

  Or it didn't happen. Included configurations to help make development and releases easier.

  | Workflow |  |
  |:--|:--|
  | [Development: Docker Setup](#docker) | Preconfigured `Dockerfile` and `docker-compose.yml` |
  | [Automated Semantic Versioning](#automated-semantic-versioning) | `npm run release` bumps version, tags repo and updates change log |
  | [Jenkins Build Pipeline](#jenkins-pipeline) | Includes `Jenkinsfile` starter |

This project is meant to be used in a microservice architecture, which is why it intentionally does not include any UI. It is also very opinionated, so feel free to customize for your needs. You might not find semicolons as offensive as I do. The most important thing is to ship high quality code (tests) and often (automation). How you do it is up to you.  

## ECMAScript 6

This project uses the [ECMAScript 2015](https://babeljs.io/learn-es2015/) standard of JavaScript.

We use [babel](https://babeljs.io/) to transpile into ECMAScript 5.

#### Babel Root Plugin

For readable imports, this project uses [babel-plugin-root-import](https://www.npmjs.com/package/babel-plugin-root-import), which uses `~` to reference the `src` folder. 

Then we can do this:

```javascript
import { userModel } from '~/models/user'
```

which is better than:

```javascript
import { userModel } from './../../../models/user'
```

You can adjust this configuration in the `.babelrc` file.

## Express Server

This project uses [Express](https://expressjs.com/), a minimalist web framework for Node.js. It's lightweight and great for APIs.

#### Port

The server defaults to port `3000`. You can change it by setting the `PORT` environment variable, for example:

```
PORT=4000 npm run server
```

## Unit Specs with Jasmine

Unit tests leverage the [Jasmine testing framework](https://github.com/jasmine/jasmine). They are executed with the standard NPM `test` command.

```
npm test
```

Unit specs:

- must use `.spec.js` as a suffix
- are preferably saved in the `/specs`, but they will be picked up anywhere
- are executed randomly

For your convenience `context()` is also aliased to `describe()`, which helps nested syntax:

```javascript
describe ('login()', () => {
  context ('valid credentials', () => {
    it ('returns true', () => {
      ...
    })
  })
  context ('invalid credentials', () => {
    it ('returns false', () => {
      ...
    })
  })
})
```


## ES6 Linter

This project is also linted for code consistency with the [recommended rule set](http://eslint.org/docs/rules/), plus some custom changes, most notably:

[Semicolons](http://eslint.org/docs/rules/semi) are _not_ allowed:

```javascript
// OK
let foo = bar

// Fails
let foo = 'bar';
```

[Spaces](http://eslint.org/docs/rules/space-before-function-paren) are _required_ before the `function` parenthesis:

```javascript
// OK
function (foo) {
  return true
}

// Fails
function(foo) {
  return true
}
```

Consistent [spacing inside curly braces](http://eslint.org/docs/rules/object-curly-spacing), for example:

```javascript
// OK
import { app }

// Fails
import {app}
```

To see all adjustments, see the `.eslintrc` file.

#### Autofix Problems

You can autofix most common linting offenses with this command:

```
npm run lint:fix
```

## Development Workflow

In _development_ however, you can leverage auto reloading with:

```
npm run dev
```

which will simultaneously run and watch:

- server
- unit specs
- linter

Or you can run them separately:

```
npm run server
npm run lint:watch
npm run test:watch
```

### Docker Setup

For your convenience, there is an included `Dockerfile` and `docker-compose.yml`, which help jumpstart your microservice architecture.

These presets save you from common gotchas:

- Dockerfile: `package.json` is copied first to avoid the heavy `npm install` step on successive builds.
- `docker-compose.yml`: note that `node_modules` is mounted separately. This is required because native bindings can differ between the container and your development computer.
- Included `.dockerignore` to avoid copying giant `node_modules` folder on build.

Note these files are configured for _development only_. If you plan to use them for development, you will make adjustments, e.g. use a different base image:

## Deployment and Production

### Jenkins Pipeline

There is a sample `Jenkinsfile` which a declarative pipeline including the following common stages:

- checkout
- `npm install`
- run linter
- run unit specs

### Automated Semantic Versioning

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automatic semantic versioning and change logs. 

1) Commit messages must follow the [Conventional Commits standard](https://conventionalcommits.org/).

2) When you are ready to release, just run:

```
npm run release
```

which will automatically:

- update your `CHANGELOG.md`
- tag your git repository

Depending on your commit messages, standard-version will automatically determine if it's a major, minor or patch release.
