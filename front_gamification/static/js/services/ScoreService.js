var ScoreService = function () {
	Service.call(this);
}

ScoreService.prototype = Object.create(Service.prototype);
ScoreService.prototype.constructor = ScoreService;


ScoreService.prototype.list = function (url, data, callback) {
	console.log("ScoreService:list")
	this.doGET(url, data, callback);
}