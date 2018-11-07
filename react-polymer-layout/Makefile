all: deps build

deps:
	npm install

build: clean
	tsc -d -p .

watch:
	tsc -d -p . -w

clean:
	rm -rf dist
