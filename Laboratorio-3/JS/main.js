//PROBLEMA 1
document
  .getElementById("form-palindromo")
  .addEventListener("submit", function (event) {
    //Evita que el formulario recargue la pagina
    event.preventDefault();

    //Obtener el valor ingresado por el usuario
    const cadena = document.getElementById("string").value;

    if (palindromo(cadena)) {
      alert("Es un palindromo de base doble");
    } else {
      alert("No es un palindromo de base doble");
    }
  });

//Funcion para determinar si el numero ingresado por usuario es una palindromo de base doble
function palindromo(t) {
  const invertirText = t.split("").reverse().join("");
  const changeToBinary = t.toString(2).split("").reverse().join("");
  return t === invertirText && t === changeToBinary;
}

//PROBLEMA 2
document
  .getElementById("form-caracteres")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const cadena = document.getElementById("input-Word").value;
    const resultado = countChars(cadena);

    let mensaje = "Frecuncia de Caracteres:\n";
    for (const [caracter, cantidad] of Object.entries(resultado)) {
      mensaje += `${caracter}: ${cantidad}\n`;
    }

    //Mostrar el mensaje con una alerta
    alert(mensaje);
  });

function countChars(cadena) {
  // Crear un objeto para almacenar la frecuencia de cada letra
  const frecuencia = {};

  // Recorrer cada carácter en la cadena
  for (let i = 0; i < cadena.length; i++) {
    const letra = cadena[i].toUpperCase(); // Convertir a mayusculas

    // Solo considerar letras
    if (/[A-Z]/.test(letra)) {
      if (frecuencia[letra]) {
        frecuencia[letra]++;
      } else {
        frecuencia[letra] = 1;
      }
    }
  }

  return frecuencia;
}

//PROBLEMA 3
document
  .getElementById("from-año")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const year = document.getElementById("input-Year").value;
    const año = Number(year);

    if (yearBisiesto(año)) {
      alert("El año es bisiesto");
    } else {
      alert("El año no es bisiesto");
    }
  });

//Funcion para determinar que un año es bisiesto
function yearBisiesto(a) {
  return a % 4 === 0;
}

//PROBLEMA 4
document
  .getElementById("from-numero")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const numero = document.getElementById("input-Number").value;
    const valor = Number(numero);

    if (isNaN(valor) || valor < 0) {
      alert("Por favor, introduce un numero valido.");
      return;
    }

    alert(sumaPrimos(valor));
  });

//Funcion para determinar que el numero es primo
function primo(num) {
  if (num < 0) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

//Funcion para la suma de todos lo numeros primos menores que N
function sumaPrimos(n) {
  let suma = 0;
  for (let i = 0; i <= n; i++) {
    if (primo(i)) {
      suma += i;
    }
  }
  return suma;
}
