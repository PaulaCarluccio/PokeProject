1. No se contempló la creación de un archivo `.gitignore`.
2. Para el fixture, se podría indicar `auto:true` y no sería necesario llamarlo de manera explícita, ver: [https://playwright.dev/docs/test-fixtures#automatic-fixtures](https://playwright.dev/docs/test-fixtures#automatic-fixtures)
3. La hora de finalización de cada test podría incluirse dentro del fixture.
4. No es necesario axios para poder descargar la imagen.
5. Varias validaciones se hacen con un if y lanzando un error, en vez de hacer un assertion, por ejemplo, el tamaño del archivo.
6. Haría el loop fuera del test, ver: [https://playwright.dev/docs/test-parameterize](https://playwright.dev/docs/test-parameterize). De esta manera, se podría paralelizar las pruebas y tener mayor independencia, dado que de lo contrario, si, por ejemplo, no se descarga una imagen, no habría manera de saber cómo es el comportamiento con los demás pokemon
