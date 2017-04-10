.PHONY: build watch

build:
	tsc -d --jsx react --noUnusedLocals --removeComments --strictNullChecks --outDir dist src/js/index.tsx

watch:
	tsc -d --jsx react --noUnusedLocals --removeComments --strictNullChecks --outDir dist -w src/js/index.tsx
