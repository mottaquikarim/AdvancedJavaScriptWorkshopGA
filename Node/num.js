// DEFINE the following:
// function getPI, return PI
// function getCircumference
//		takes in radius
// 		computes circumference and returns
// function getArea
// 		takes in radius
// 		computers the area of circle

var PI = Math.PI;

var _api = {};

_api.getPI = function getPI() {
	return PI;
};

_api.getCircumference = function getCircumference( r ) {
	return this.getPI()*2*r;
};

_api.getArea = function getArea( r ) {
	return this.getPI() * r * r;
};

module.exports = _api;