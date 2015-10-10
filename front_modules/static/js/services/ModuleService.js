function ModuleService () {
	//console.log("ModuleService :instance created")
  	Service.call(this);
};

ModuleService.prototype = Object.create(Service.prototype);
ModuleService.prototype.constructor = ModuleService;

ModuleService.prototype.create = function (url, data, callback) {
	this.doPOST(url, data, callback);
}

ModuleService.prototype.retrieve = function (url, callback) {
	this.doGET(url, callback);
}

ModuleService.prototype.list = function (url, callback) {
	this.doGET(url, callback);
}
