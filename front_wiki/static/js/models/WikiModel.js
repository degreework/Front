var WikiModel = {};


WikiModel.generate_url = function(mod_slug, page_slug)
{
	return Site.geRootUrl()+'/'+mod_slug+'/wiki/'+page_slug;
}

WikiModel.generate_url_request =function(slug, version)
{
	return host+":"+location.port+'/wiki/create/'+slug+".."+version;
}