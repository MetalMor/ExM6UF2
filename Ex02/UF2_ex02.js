function mostrar(o) {
	
	var sortida = "";
	
	for (x in o) {
		
		sortida += x + ": " + o[x] + "<BR>";
		
	}
	
	return sortida;
	
}

function afegir(o,p) {

	for (x in p) {
		
		if (!o.hasOwnProperty(x))
			o.x = p.x;
		else
			alert("La propietat " + x + " ja existeix.");
		
	}
	
	return o;

}

function esborrarUniques(o,p) {
	
	for (x in o) {
		
		if (!p.hasOwnProperty(x))
			delete o.x;
			
	}
			
	return o;
	
}

function subtreure(o,p) {
	
	for (x in o) {
		
		if (p.hasOwnProperty(x))
			delete p.x;
			
	}
	
	return o;
	
}

function unir() {
	
	var q = {};
	
	for (x in p) {
		
		if (o.hasOwnProperty(x))
			q.x = o.x;
		else
			q.x = p.x;
	
	}
	
	return q;
	
}

function interseccionar(o,p) {
	
	var q = {};
	
	for (x in p) {
		
		if (o.hasOwnProperty(x))
			q.x = o.x;
		
	}
	
	return q;
	
}

function main() {
	
	var o = {a: "hola",
		c: 5, 
		e: 7.4,
		g: 300,
		frog: "frog"
	};
		
	var p = {a: "aloh",
		b: "adeu",
		d: -5,
		f: 2.9,
		h: 6000,
		frog: "granota"
	};
	
	var q = {}
	
	document.getElementById("afegir").addEventListener("click", function(o,p) {
		alert(afegir(o,p));
	});
	document.getElementById("esborrar uniques").addEventListener("click", function(o,p) {
		alert(esborrarUniques(o,p));
	});
	document.getElementById("subtreure").addEventListener("click", function(o,p) {
		alert(subtreure(o,p));
	});
	document.getElementById("unir").addEventListener("click", function(o,p) {
		alert(unir(o,p));
	});
	document.getElementById("interseccionar").addEventListener("click", function(o,p) {
		alert(interseccionar(o,p));
	});

}

window.onload = main();
