var cartera = {}; //creacion del prototipo

function afegirStock() { //funcion que añade valores a la cartera

	var nom = document.getElementById("nom").value;
	var valor = document.getElementById("valor").value;
	
	cartera[nom] = valor;
	
	document.getElementById("afegit").innerHTML = "Has afegit: " + nom + ": " + valor + ".";
	
}

function obtenirValorTotalCartera() {
	
	var suma = 0.0;
	
	for (x in cartera) {
		suma += parseInt(cartera[x]);
	}
	
	document.getElementById("resultat").innerHTML = "Resultat: " + suma + ".";
	
}
