.PHONY: test

deps:
	npm install

build: deps
	tsc -d -p .

watch:
	tsc -d -p . -w

test:
	1c build -c test/ test/*.tsx
	node test/renderToString.js
