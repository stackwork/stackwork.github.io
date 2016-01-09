---
title: Integrate the build with an application stack
subtitle: How to integrate with Docker Compose application stack definitions
layout: default
---
Stackwork allows you to run tests against an application stack defined with [Docker Compose](https://docs.docker.com/compose/).
To explain how this can be setup, we'll go through some of Stackwork's features.

## A testing module with a stack definition
 
The Stackwork [module types](/reference/modules/) `TEST` and `TEST_IMAGE` activate the running and stopping of an application stack.
The simplest setup to do so has a module

~~~ groovy
// mod-1/build.gradle

apply plugin: 'stackwork'

stackwork {
  moduleType = 'TEST' | 'TEST_IMAGE' 
}
~~~

with an application stack definition

~~~ yml
# mod-1/docker-compose.yml.template

service:
  image: qkrijger/wiremock:0.1
~~~

Run `gradle stackworkCheck` to have Stackwork

1. build all the images 
2. parse the docker compose template file
3. start the application stack
4. write connection info to the Gradle stackwork object
5. run tests
6. stop the application stack

In the current simple setup, step 1, 2 and 5 are trivial: we're not building images yet; the parsed template is identical to the template
 itself; and no tests have been setup. Nonetheless, you will see the 'stack' being started and stopped.
 You could now define your own Gradle tasks that [hook into this process](/reference/gradle-tasks/).
 Or you can use the out of the box integration of Stackwork with JVM based languages to now write [tests in code](/usage/tests-in-code/).
 This page will continue to focus on the application stack itself.

## Use images created during the build

Modules of types `IMAGE` and `DELIVERABLE_IMAGE` are built before any application stack is started.
The resulting images can be used in the stack definition of any test module.

First use case: test the image built in the root project.
Suppose the main project is of type `DELIVERABLE_IMAGE` and the product is a REST API server.


Another use case: define any image 
Say, we have a second module: `mod-2` that contains a  
The templating of the stack definition allows you to use images built during the build itself

## Use the
