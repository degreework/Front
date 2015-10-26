function MaterialService () {
	//console.log("MaterialService :instance created")
  	Service.call(this);
};

MaterialService.prototype = Object.create(Service.prototype);
MaterialService.prototype.constructor = MaterialService;


MaterialService.prototype.create = function (url, data, callback) {
	this.doPOST(url, data, callback);
}

MaterialService.prototype.update = function (url, data, callback) {
	this.doPUT(url, data, callback);
}

MaterialService.prototype.retrieve = function (url, data, callback) {
	this.doGET(url, data, callback);
}

MaterialService.prototype.list = function (url, callback) {
	this.doGET(url, callback);
}

MaterialService.prototype.delete = function (url, callback) {
	this.doDELETE(url, {}, callback);
}
