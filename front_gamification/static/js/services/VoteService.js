function VoteService() {
	console.log("VoteService:instance created")
  	Service.call(this);
};

VoteService.prototype = Object.create(Service.prototype);
VoteService.prototype.constructor = VoteService;


VoteService.prototype.give = function (url, data, callback) {
	this.doPOSTjSON(url, data, callback);
}

VoteService.prototype.list = function (url, callback) {
	this.doGET(url, callback);
}
