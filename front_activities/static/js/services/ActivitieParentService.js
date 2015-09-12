function ActivitieParentService () {
	console.log("ActivitieParentService :instance created")
  	Service.call(this);
};

ActivitieParentService.prototype = Object.create(Service.prototype);
ActivitieParentService.prototype.constructor = ActivitieParentService;


ActivitieParentService.prototype.create = function (url, data, callback) {
	this.doPOST(url, data, callback);
}


ActivitieParentService.prototype.retrieve = function (url, data, callback) {
	this.doGET(url, data, callback);
}
