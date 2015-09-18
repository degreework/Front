function GamificationService() {
	console.log("GamificationService:instance created")
  	Service.call(this);
};

GamificationService.prototype = Object.create(Service.prototype);
GamificationService.prototype.constructor = GamificationService;


GamificationService.prototype.create = function (url, data, callback) {
	console.log("GamificationService:create")
	this.doPOST(url, data, callback);
}

GamificationService.prototype.dispatch = function (url, data, callback) {
	console.log("GamificationService:dispatch")
	this.doPOST2(url, data, callback);
}

GamificationService.prototype.retrieve = function (url, callback) {
	console.log("GamificationService:retrieve")
	this.doGET(url, callback);
}

GamificationService.prototype.update = function (url, data, callback) {
	console.log("GamificationService:update")
	this.doPUT(url, data, callback);
}

GamificationService.prototype.update2 = function (url, data, callback) {
	console.log("GamificationService:update2")
	this.doPUT2(url, data, callback);
}

GamificationService.prototype.list = function (url, callback) {
	console.log("GamificationService:list")
	this.doGET(url, callback);
}


GamificationService.prototype.delete = function (url, div, callback) {
	console.log("GamificationrService:delete")
	this.doDELETE(url, div, callback);
}
