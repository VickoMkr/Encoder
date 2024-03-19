// Función para validar el texto ingresado
function validarTexto() {
    const input = document.getElementById("txtUsuario").value;
    const patron = /^[a-zA-Z0-9\s]+$/; // evita que el usuario ingrese caracteres especiales (pero aun no logro que capture textos con el formato de documentos oficiales, sun hacer saltar el alert)
    if (input && !patron.test(input)) {
        alert("Los caracteres especiales no seran encriptados");
    }
}

// Función para cifrar o descifrar el texto
function cifrarDescifrarTexto(texto, desplazamiento, direccion) {
    let resultado = "";
    for (let i = 0; i < texto.length; i++) {
        let charCode = texto.charCodeAt(i);
        let baseCode = charCode < 97 ? 65 : 97; // Código base para letras mayúsculas o minúsculas en ASCII
        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) { // Verifica si el carácter es una letra del alfabeto
            let offset = direccion === 'cifrar' ? desplazamiento : -desplazamiento; // Determina si se cifra o descifra y ajusta el desplazamiento en consecuencia
            let newCharCode = ((charCode - baseCode + offset + 26) % 26) + baseCode; // Calcula el nuevo código ASCII del carácter cifrado o descifrado
            resultado += String.fromCharCode(newCharCode); // Convierte el código ASCII nuevamente a carácter y lo agrega al resultado
        } else {
            resultado += texto.charAt(i); // Si el carácter no es una letra, simplemente se añade al resultado sin cifrar o descifrar
        }
    }
    return resultado; // Retorna el texto cifrado o descifrado
}

// Función para el botón de cifrado
function cifrarTexto() {
    validarTexto(); // Llama a la función para validar el texto
    let textoOriginal = document.getElementById("txtUsuario").value;
    let textoCifrado = cifrarDescifrarTexto(textoOriginal, 3, 'cifrar'); // Llama a la función cifrarDescifrarTexto para cifrar
    document.getElementById("txtEncriptado").value = textoCifrado; // Establece el texto cifrado en la caja demtexto cifrado/descifrado
}

// Función para el botón de descifrado
function descifrarTexto() {
    validarTexto(); // Llama a la función para validar el texto
    let textoCifrado = document.getElementById("txtUsuario").value;
    let textoDescifrado = cifrarDescifrarTexto(textoCifrado, 3, 'descifrar'); // Llama a la función para descifrar el texto
    document.getElementById("txtEncriptado").value = textoDescifrado; // Establece el texto cifrado en la caja demtexto cifrado/descifrado
}

// Función para pegar texto desde el portapapeles
function pegarTexto() {
    navigator.clipboard.readText() // lee el texto del portapapeles
        .then(textoPegado => {
            document.getElementById("txtUsuario").value = textoPegado;
        }) //"pega" el texto almacenado en la caja de texto

}

// Función para copiar el texto encriptado al portapapeles
function copiarTexto() {
    let textoEncriptado = document.getElementById("txtEncriptado").value; // se usara para copiar el texto encriptado al portapapeles
    navigator.clipboard.writeText(textoEncriptado)
        .then(function() {
            alert("Texto copiado al portapapeles correctamente."); 
        });
}
