---
title: Reference
layout: default
---

## settings.gradle
Stackwork utilizes Gradle's [multiproject ](https://docs.gradle.org/current/userguide/multi_project_builds.html) feature.
Stackwork modules are defined as Gradle subprojects. Your project should contain a `settings.gradle` in which all
modules are imported. For instance, a project with subprojects `module-1` and `module-2` has a project directory containing the
subdirectories `module-1` and `module-2` and a settings file:

~~~ groovy
// settings.gradle
include 'module1', 'module-2'
~~~

## build.gradle
The project and all subprojects that function as Stackwork modules should contain a `build.gradle` file applying the Stackwork plugin.

~~~ groovy
// build.gradle

// in the main project. Not needed in subprojects
plugins {
  id 'org.stackwork' version '0.6.0-rc.6'
}

// in subprojects. Not needed in the main project
apply plugin: 'stackwork'

version = '1.0'

stackwork {
  // unlike other types, default does not activate any functionality
  moduleType = DEFAULT
  
  // name for published image
  imageName = 'image-name'
  // the name can also include a namespace and repository
  imageName = 'stackwork/image-name'
  imageName = 'https://repo.stackwork.org:1337/stackwork/image-name'
  
  // if an image built in this module depends on one built in another 
  baseImageProject = (project)
  
  // a module can share another module's compose file
  composeProject = (project)
}

dependencies {
  // stackwork dependencies are supplied to the Dockerfile
  stackwork group: 'org.stackwork', name: 'name', version: '0.1', ext: 'tar.gz'
}
~~~

## Module Types

### DEFAULT
No functionality. This is the default module type (duh).

### TEST
Test module. Runs Java (or Groovy or Scala) tests against the Docker Compose setup. Does not build an image.

Is assumed to have applied the [JavaPlugin](https://docs.gradle.org/current/userguide/java_plugin.html).
The test task JVM will be enriched with runtime information for the services defined in the Docker Compose setup.

### TEST_IMAGE
Test image module. Builds a test image, and runs that against the Docker Compose setup.

### IMAGE
Image module. Any image needed in other modules docker compose setups can be created in an image module.

### DELIVERABLE_IMAGE
Image module for a deliverable image. For a deliverable image, tag and push tasks are created.

Often, the root project has this type, building the image under test.

Multiple modules can have this type, allowing to push multiple image in the same build job.

### COMPOSE
A Docker Compose module that supplies a Docker Compose stack definition.

The root project may be of this type, which makes sense if the Docker Compose file itself is the deliverable that you would like to test.

Any module can be of this type to supply the docker compose setup to multiple other modules.

## Gradle tasks

### buildImage

### tagImage

### pushImage
