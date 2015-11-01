var Module = function()
{

}


Module.getURL_section_from_slug = function(slug)
{
	return Site.geRootUrl() + '/' +slug;	
}

Module.getURL_from_slug = function(slug)
{
	return Site.geRootUrl() + '/modules/'+slug;
}

Module.getURL = function(slug, module, id)
{
	/*@slug: Modules's slug,
	**@module: is wiki, forum or activitie
	**@id: Post's id
	 */
	return Site.geRootUrl() + '/'+slug+'/'+module+'/'+id;
}
