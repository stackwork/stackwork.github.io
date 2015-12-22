#!/usr/bin/env bash

docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll -it -p 80:4000 jekyll/jekyll
