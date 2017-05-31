build: install
	tsc -d -p . --outDir dist

watch:
	tsc -d -p . --outDir dist -w

install:
	yarn install

test: build
	node test/test_*.js
