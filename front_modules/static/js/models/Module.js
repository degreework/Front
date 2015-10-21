var Module = function()
{

}

Module.getURL_from_slug = function(slug)
{
	return Site.geRootUrl() + '/modules/detail/'+slug;
}

Module.getURL = function(slug, module, id)
{
	/*@slug: Modules's slug,
	**@module: is wiki, forum or activitie
	**@id: Post's id
	 */
	return Site.geRootUrl() + '/'+slug+'/'+module+'/'+id;
}
