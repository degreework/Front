var ActivitieParentModel = function(){}


ActivitieParentModel.get_detail_url = function(id)
{
	return "/activity/"+id;
}

ActivitieParentModel.get_list_child_url = function(id)
{
	return Site.geRootUrl()+"/activity/list/"+id;
}