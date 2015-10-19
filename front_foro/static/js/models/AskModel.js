var AskModel = {};

AskModel.generate_url = function(slug, id)
{
	return Site.geRootUrl()+'/'+slug+'/forum/'+id;
}
