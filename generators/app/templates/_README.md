# <%=appname%>


### Quick start
Steps:

* Open a terminal
* `npm install `
* `npm start` from a terminal or use the npm tool window
* Once processing completes,  a browser window will open at http://localhost:2368


For a complete list of available commands and to add tab auto-completion, run the following commands in a terminal:

    $ npm completion >> ~/.bashrc
    $ source ~/.bashrc
    $ npm run-script <tab><tab>
    
which will produce the following output:   

```
acceptance            bump-version:patch    delayed-open          eb-docker             postinstall           rimraf
build                 client                e2e                   eb-tag                preacceptance         server
bump-version:commit   coverage              e2e-test-server       lint                  prebuild              start
bump-version:major    coverage-clean        eb-bundle:beta        postacceptance        precoverage           test
bump-version:minor    coverage-open         eb-bundle:production  poste2e               pree2e         

```

# Table of Contents

* [Quick Start](#quick-start)
* [Docker Quick Start](#docker-quick-start)
* [UX Design and Overview](#ux-design-and-overview)
* [Testing](#testing)
    * [Unit Tests](#unit-tests)
    * [Acceptance Tests](#acceptance-tests)
* [Deployment](#deployment)
* [Architecture](#architecture)
* [File Structure](#file-structure)
    
## Docker Quick Start
Steps:

* Open a terminal
* run `docker-compose up`
* Once processing completes, open http://localhost:2368

notes: 

* to get the latest image run `docker-compose pull`
* on Windows inotify is not working so fall back to [polling](http://andrewhfarmer.com/webpack-watch-in-vagrant-docker/)
* for easy access to volumes or terminal and browser instances consider using Kitematic
    
## UX Design and Overview

## Testing

#### Unit Tests

* single run: `npm test`
* coverage: `npm run coverage` ( optionally perform `npm run coverage-open` ) 

#### Acceptance Tests

* Ensure that start task is not running (no servers on http://localhost:2368)
* Spin up the instrumented test server `npm run e2e-test-server`
* Run one of the following BDD tests suites:
     * Gherkin `npm run acceptance`
     * Mocha `npm run e2e`
* Upon successful execution of the test suites, a coverage report will be generated and opened

## Deployment
see deployment [README](./deployment/README.md)

## Architecture

## File Structure
