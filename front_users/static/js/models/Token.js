var Token = {
	s : StorageClass.getInstance()
};

Token.exist = function()
{
	return this.s.storage.get("token");
}

Token.acces_token = function()
{
	return this.s.storage.get("token").access_token;
}

Token.token_type = function()
{
	return this.s.storage.get("token").token_type;
}

Token.get_RequestHeader = function()
{
	return "Authorization" + Token.token_type() +" "+ Token.acces_token();
}