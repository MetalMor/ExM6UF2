function Figure(x,y){
	
	this.x = x;
	this.y = y;
	
	this.area = function() {
		return area = this.x * this.y; 
	}
	
};

var Circle = {
	
	radius: 3,
	
	area: function() { 
		return Math.PI * radius * radius; 
	}
	
};

var Rectangle = {
	
	length: 7,
	width: 3,
	
	area: function() {
		return length * width;
	}
	
};

var Triangle = {
	
	base: 5,
	height: 4,
	
	area: function() {
		return (base * height)/2;
	}
	
};
