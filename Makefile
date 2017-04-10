.PHONY: build watch

FLAGS=-d --jsx react --noUnusedLocals --removeComments --strictNullChecks --outDir dist

build:
	tsc ${FLAGS} src/index.tsx

watch:
	tsc ${FLAGS} -w src/index.tsx
