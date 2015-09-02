function QuestionService() {
	//console.log("AskService:instance created")
  	Service.call(this);
};

QuestionService.prototype = Object.create(Service.prototype);
QuestionService.prototype.constructor = QuestionService

QuestionService.prototype.create = function (url, data, callback) {
	console.log("QuestionService:create")
	this.doPOST(url, data, callback);
}


QuestionService.prototype.retrieve = function (url, callback) {
	console.log("QuestionService:retrieve")
	this.doGET(url, callback);
}

QuestionService.prototype.update = function (url, data, callback) {
	console.log("QuestionService:update")
	this.doPUT(url, data, callback);
}


QuestionService.prototype.list = function (url, callback) {
	console.log("QuestionService:list")
	this.doGET(url, callback);
}


QuestionService.prototype.delete = function (url, div, callback) {
	console.log("QuestionService:delete")
	this.doDELETE(url, div, callback);
}