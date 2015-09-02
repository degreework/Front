function QuizService() {
	//console.log("AskService:instance created")
  	Service.call(this);
};

QuizService.prototype = Object.create(Service.prototype);
QuizService.prototype.constructor = QuizService

QuizService.prototype.create = function (url, data, callback) {
	console.log("QuizService:create")
	this.doPOST(url, data, callback);
}

QuizService.prototype.dispatch = function (url, data, callback) {
	console.log("QuizService:create")
	this.doPOST2(url, data, callback);
}


QuizService.prototype.retrieve = function (url, callback) {
	console.log("QuizService:retrieve")
	this.doGET(url, callback);
}

QuizService.prototype.update = function (url, data, callback) {
	console.log("QuizService:update")
	this.doPUT(url, data, callback);
}

QuizService.prototype.update2 = function (url, data, callback) {
	console.log("QuizService:update")
	this.doPUT2(url, data, callback);
}

QuizService.prototype.list = function (url, callback) {
	console.log("QuizService:list")
	this.doGET(url, callback);
}


QuizService.prototype.delete = function (url, div, callback) {
	console.log("QuizService:delete")
	this.doDELETE(url, div, callback);
}