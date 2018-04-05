build:
	tsc -d -p . --outDir dist

watch:
	tsc -d -p . --outDir dist -w

test: build
	node test/test_*.js
