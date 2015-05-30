var Error = {};

Error.server_not_found = function()
{
	Notify.show_error("Servidor", "No se pudo conectar al servidor");
}