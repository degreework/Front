var AskModel = {};

AskModel.generate_url = function(slug)
{
	console.log("GENERA")
	return host+":"+location.port+'/forum/detail/'+slug;
}
