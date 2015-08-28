function AnswerService() {
	console.log("AnswerService:instance created")
  	Service.call(this);
};

AnswerService.prototype = Object.create(Service.prototype);
AnswerService.prototype.constructor = AnswerService;


AnswerService.prototype.create = function (url, data, callback) {
	console.log("AnswerService:create")
	this.doPOST(url, data, callback);
}


AnswerService.prototype.retrieve = function (url, callback) {
	console.log("AnswerService:retrieve")
	this.doGET(url, callback);
}

AnswerService.prototype.update = function (url, data, callback) {
	console.log("AnswerService:update")
	this.doPUT(url, data, callback);
}


AnswerService.prototype.list = function (url, callback) {
	console.log("AnswerService:list")
	this.doGET(url, callback);
}

/*
AnswerService.prototype.delete = function (url, callback) {
	console.log("AnswerService:delete")
	this.doDELETE(url);
}
*/