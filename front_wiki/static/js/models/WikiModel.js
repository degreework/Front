var WikiModel = {};


WikiModel.generate_url = function(slug)
{
	console.log("GENERA")
	return host+":"+location.port+'/wiki/'+slug;
}