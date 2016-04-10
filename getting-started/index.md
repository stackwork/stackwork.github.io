---
title: Getting started with Stackwork
layout: default
---
## Prerequisites
- **Docker CLI**: you should be able to run `docker` commands on your build machine, although the Docker daemon
may be installed on a remote or in a cloud service.
- **Docker Compose CLI**: you should be able to run `docker-compose` commands on your build machine.
- **JVM** (Java Virtual Machine): Stackwork is a Gradle plugin, which needs Java to run.
- **Gradle Wrapper**: we advise to use [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html)
in your projects. If you do not want to, you can always install Gradle on your build machines.

## Importing Stackwork in your project
Stackwork is published on the [Gradle plugin portal](https://plugins.gradle.org/plugin/org.stackwork), so your projects
can download it with little configuration. You should have a `build.gradle` in the main project directory containing
at least

~~~ groovy
// /build.gradle

plugins {
  id 'org.stackwork' version '0.6.0'
}
~~~

See [here on Github](https://github.com/stackwork/stackwork/releases) for the latest release.

## Create your test stack(s) and suite(s)
You can now create [Stackwork modules](/reference/modules) for all the different parts of your testing setup.
Since the modules technically are Gradle sub projects you will have a `settings.gradle` to include them.
The root project can be a module as well, which makes sense if you want [one of the deliverables of your project is in
fact a Docker image](/usage/build-publish/). For every module, you should have a `build.gradle` that applies Stackwork
and configures it with at least the module type:

~~~ groovy
// module-dir/build.gradle

import static org.stackwork.gradle.docker.ModuleType.*

// in the root project you can skip the following line:
apply plugin: 'stackwork'

stackwork {
  moduleType = ${MODULE TYPE}
  // further configuration
}
~~~

## A note on Gradle
Gradle is a powerful and versatile tool. You can for instance create tasks producing anything you might need in the
creation of your (test) images. Or you can create your own custom tasks that scan the stack log files for certain
messages and fail your build if you found such. The possibilities are near endless, so be sure to take a look at the
[Gradle documentation](https://docs.gradle.org/current/userguide/userguide.html) if you are not familiar with this
build tool yet.

## Onwards
To dive into some regularly occuring use cases, see the collection of pages below _Usage_.
To see everything that Stackwork has to offer, see those below _Reference_.
