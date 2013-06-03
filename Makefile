#!/bin/bash
DIST_DIR = ./build

JS_SRC = ${LIB} src/bludder.js

JS_FILE = bludder.js
JS_FILE_MIN = bludder.min.js

JS_DIST_FILE = ${DIST_DIR}/${JS_FILE}
JS_DIST_FILE_MIN = ${DIST_DIR}/${JS_FILE_MIN}


CSS_SRC = src/*.css
CSS_DIST_FILE = ${DIST_DIR}/bludder.css


#target: all - clean, build and minify
all: clean min

#target: dist - build
dist: ${JS_SRC}
	@cat ${JS_SRC} > ${JS_DIST_FILE}
	@cat ${CSS_SRC} > ${CSS_DIST_FILE}
	@echo 'target:' $@', building from:' ${JS_SRC}

#target: min - minify built file
min: dist
	@uglifyjs ${JS_DIST_FILE} > ${JS_DIST_FILE_MIN}
	@echo 'target:' $@', using uglifyjs'

#target: lint - run jshint tests
lint: dist
	@jshint --config .jshint-conf ${JS_DIST_FILE}
	@echo 'target:' $@', using jshint'

#target: clean - remove built files
clean:
		@rm -f ${DIST_DIR}/*.js
		@rm -f ${DIST_DIR}/*.css
		@echo 'target:' $@

#target: help - show available targets
help:
	@echo 'Available targets:'
	@egrep "^#target:" [Mm]akefile
