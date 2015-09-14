var ActivitieParentModel = function(){}


ActivitieParentModel.get_detail_url = function(id)
{
	return Site.geRootUrl()+"/activity/"+id;
}