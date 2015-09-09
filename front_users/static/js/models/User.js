var User = {
	s : StorageClass.getInstance()
};

User.exist = function()
{
	return this.s.storage.get("user");
}

User.get_id = function()
{
	return this.s.storage.get("user").id;
}

User.get_first_name = function()
{
	
	return this.s.storage.get("user").first_name;
}

User.get_last_name = function()
{
	
	return this.s.storage.get("user").last_name;
}

User.get_thumb = function(id)
{
	
	return this.s.storage.get("user").thumb[id];
}