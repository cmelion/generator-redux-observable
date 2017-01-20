

# generator-redux-observable  
An opinionated tool ([Yeoman](http://yeoman.io) generator) for scaffolding an app using react, redux and webpack

Image available on [DockerHub](https://hub.docker.com/r/cmelion/generator-redux-observable/)
[![](https://images.microbadger.com/badges/image/cmelion/generator-redux-observable.svg)](https://microbadger.com/images/cmelion/generator-redux-observable "Get your own image badge on microbadger.com")

note: the DockerHub image is meant to be used from an existing project.  See [Sample Docker Workflow](https://github.com/cmelion/generator-ng2-webpack/wiki/Sample-Docker-Workflow-using-Docker-for-Mac-Beta)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-redux-observable using [npm](https://www.npmjs.com/). If you don't already have node.js/npm installed, we recommend using [nvm](https://github.com/creationix/nvm) (windows users may want to consult the [wiki](https://github.com/cmelion/generator-ng2-webpack/wiki/NVM-installation-for-Windows)).

```bash
npm install -g yo
npm install -g generator-redux-observable
```

Then generate your new project:

```bash
# create an application directory
$mkdir my-app

# change directory to your app
$ cd my-app

yo redux-observable [project-name]
```

You then have access to the following sub generators:
* **yo redux-observable:action** (Creates a action)
* **yo redux-observable:reducer** (Creates a reducer)
* **yo redux-observable:component** (Creates a component)

note:  components are currently react only with ng2 on the roadmap

Resulting in a complete, yet simple, starter for React using redux and Webpack.

You may prefer to use npm to run your sub-generators.
For a complete list of available commands and to add tab auto-completion, run the following commands in a terminal:

    $ npm completion >> ~/.bashrc
    $ source ~/.bashrc
    $ npm run <tab><tab>
    
which will produce the following output    
```

 
```

This workflow serves as a starting point for building component based applications using Webpack. 

* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting.
* Testing environment using mocha as the framework.
* Code coverage as an option when tests are run.
* No gulp and no grunt, just npm scripts.

>Warning: Make sure you're using the latest version of Node.js and NPM

### Quick start


```bash

# change directory to your app
$ cd my-app

# start the server
$ npm start
```

go to [http://localhost:2368](http://localhost:2368) in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [File Structure](#file-structure)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
    * [Roadmap](#roadmap)
    * [FAQ](#frequently-asked-questions)
* [License](#license)

# Getting Started

## File Structure

```

```

## Dependencies

What you need to run this app:
* `node` and `npm` (Use [NVM](https://github.com/creationix/nvm))
* Ensure you're running Node (`v4.1.x`+) and NPM (`2.14.x`+) or greater

## Installing

```bash
# create an application directory
$mkdir my-app

# change directory to your app
$ cd my-app

yo redux-observable [project-name]
```
That's it!

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:2368`.

## Developing

### Build files and prepare deployment package

* single run: `npm run build`

## Testing

#### 1. Unit Tests

* single run: `npm test`

## Mocking with [JSON Server](https://github.com/typicode/json-server) 

## Roadmap

* [Docker](https://www.docker.com/) integration

## Frequently asked questions




# License


