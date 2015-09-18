function ActivitieChildService () {
	console.log("ActivitieChildService :instance created")
  	Service.call(this);
};

ActivitieChildService.prototype = Object.create(Service.prototype);
ActivitieChildService.prototype.constructor = ActivitieChildService;


ActivitieChildService.prototype.create = function (url, data, callback) {
	this.doPOST(url, data, callback);
}

ActivitieChildService.prototype.list = function (url, callback) {
	this.doGET(url, callback);
}

ActivitieChildService.prototype.retrieve = function (url, data, callback) {
	this.doGET(url, data, callback);
}

ActivitieChildService.prototype.check = function (url, data, callback) {
	this.doPOST2(url, data, callback);
}
