.PHONY: build watch

build:
	tsc -d --jsx react --noUnusedLocals --removeComments --strictNullChecks src/js/index.tsx

watch:
	tsc -d --jsx react --noUnusedLocals --removeComments --strictNullChecks -w src/js/index.tsx
