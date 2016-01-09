---
title: Stackwork modules
layout: default
---
Stackwork is opinionated in how a project should be setup. A key concept are the Stackwork modules.
Stackwork uses Gradle's [multiproject ](https://docs.gradle.org/current/userguide/multi_project_builds.html) feature,
where Stackwork modules are defined as Gradle subprojects. 
Simply put, a Gradle subproject is a subdirectory with its own `build.gradle` file.
This allows for clean separation of concerns.

A Stackwork module should be configured to be of one of the following types in the [build file](/reference/build-file/).
The stackwork plugin should also be applied in the build file.
If no type is set, the `DEFAULT` module type will be used, but that has no associated functionality.

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

## settings.gradle

Since Stackwork modules are defined as Gradle subprojects, your project should contain a `settings.gradle` in which all
modules are imported. For instance, a project with subprojects `module-1` and `module-2` has a project directory containing the
subdirectories `module-1` and `module-2` and a settings file:

~~~ groovy
// settings.gradle
include 'module1', 'module-2'
~~~
