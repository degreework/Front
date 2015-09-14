function ActivitieParentService () {
	//console.log("ActivitieParentService :instance created")
  	Service.call(this);
};

ActivitieParentService.prototype = Object.create(Service.prototype);
ActivitieParentService.prototype.constructor = ActivitieParentService;


ActivitieParentService.prototype.create = function (url, data, callback) {
	this.doPOST(url, data, callback);
}

ActivitieParentService.prototype.update = function (url, data, callback) {
	this.doPUT(url, data, callback);
}

ActivitieParentService.prototype.retrieve = function (url, data, callback) {
	this.doGET(url, data, callback);
}

ActivitieParentService.prototype.list = function (url, callback) {
	this.doGET(url, callback);
}

ActivitieParentService.prototype.delete = function (url, callback) {
	this.doDELETE(url, {}, callback);
}
