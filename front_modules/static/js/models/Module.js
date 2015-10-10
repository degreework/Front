var Module = function()
{

}

Module.getURL = function(slug)
{
	return Site.geRootUrl() + '/modules/detail/'+slug;
}
