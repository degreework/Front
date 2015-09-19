var WikiModel = {};


WikiModel.generate_url = function(slug)
{
	console.log("GENERA")
	return host+":"+location.port+'/wiki/'+slug;
}

WikiModel.generate_url_request =function(slug, version)
{
	return host+":"+location.port+'/wiki/create/'+slug+".."+version;
}