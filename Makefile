default:
	make -C src
	mv src/*.wasm docs/wasm

srv:
	make
	python -m http.server --directory docs/
