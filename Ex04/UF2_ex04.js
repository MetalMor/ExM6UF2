function mostraValors(o) {
    document.write("hola valors");
    return o.join(", ");
}

function sumatori(o) {
    document.write("hola sumatori");
    var suma = 0;
    for (x in o) {
        suma += x;
    }
    return suma;
}

function mitjana(o, s) {
    document.write("hola mitjana");
    return s/o.length;
}

function varianca(o, mitjana) {
    
    document.write("hola varianca");
    var temp = [];
    
    for (x in o) {
        temp.push(Math.pow(x-mitjana, 2));
    }
    
    return Math.sqrt(sumatori(temp)/o.length);
}

var cartera = [1, 2, 3, 4];

var valors = mostraValors(cartera);
var sumatori = sumatori(o);
var mitjana = mitjana(cacrtera, sumatori);
var varianca = varianca(cartera, mitjana);

console.log(valors);
console.log(sumatori);
console.log(mitjana);
console.log(varianca);


document.getElementById("valors").innerHTML = valors;
document.getElementById("sumatori").innerHTML = sumatori;
document.getElementById("mitjana").innerHTML = mitjana;
document.getElementById("varianca").innerHTML = varianca;
