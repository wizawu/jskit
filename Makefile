.PHONY: build watch

build:
	tsc -d -p .

watch:
	tsc -d -p . -w