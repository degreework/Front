var ChatSocked = function()
{
}

ChatSocked.prototype.socked = "";

// se conecta al servidor donde se maneja el chat 
ChatSocked.prototype.connect = function(){

	ChatSocked.prototype.socked = io.connect('127.0.0.1:4000');
	
	ChatSocked.prototype.socked.on('connect', function() {
		console.log('connected');
	});
}


// funcion para emitir pedidos 
ChatSocked.prototype.emmit = function(name, data){

	ChatSocked.prototype.socked.emit(name, data);
}


ChatSocked.prototype.sentMessage = function(data){
	console.log('sentMessage')
	
	ChatSocked.prototype.socked.emit('message', data);
}


// funcion donde renderiza la lista de usuarios y escucha los mensajes enviados s
ChatSocked.prototype.listen = function(){
	
	ChatSocked.prototype.socked.on('nbUsers', function(msg) {
		
		console.log(msg)
		
		$("#list_chat").empty();

		user = JSON.parse(localStorage.getItem('user'))

		for (var i = 0; i < msg.length; i++) {

				
			if (user.first_name !== msg[i].first_name && user.last_name !== msg[i].last_name) {
				
				var elemento = ('<a href="#" id="chat'+msg[i].id+'"> <div id ="'+msg[i].id+'" name="'+msg[i].first_name+' '+msg[i].last_name+'"> '+msg[i].first_name+' '+msg[i].last_name+'</div> </a>')
				//<img src="http://127.0.0.1:8080'+msg[i].thumb[0]+'"/>
				$("#list_chat").append(elemento)
			
			};
			

			
			// para cada cuadrito de chat
			$('#chat'+msg[i].id).click(function(e){

				//console.log($(e.target)[0].id)
				var room = $( "#room" ).clone()
				room.id = 'room-'+$(e.target)[0].id
				$(room).find('#title_chat').text($($(e.target)[0]).attr('name'))
				$(room).find('#messageInput').attr('id', 'input-'+$(e.target)[0].id)
				$(room).appendTo( "#list-room" );
				chat($(e.target)[0].id)

			})
		};
	});

	//escucha el mensaje
	ChatSocked.prototype.socked.on('message', function(msg) {
		
		console.log('me llego el mensaje');
		console.log(msg);
		ChatSocked.prototype.addMessage(msg['message'], msg['pseudo'], new Date().toISOString(), false);
		
	});
}

function chat(id){
	console.log('entro')
	console.log(id)
	//para enviar
			$('#input-'+id).keypress(function (e) {
				if (e.which == 13) {
					
					console.log('envio')
					//console.log($(e.target).val())
					// se envia el mensaje 
					//ChatSocked.prototype.emit('message', contenido)
					data = {'msg':$(e.target).val(), 'to': id}
					ChatSocked.prototype.sentMessage(data)

					
					//se pega el mensaje en el recuadro de chat
					//ChatSocked.prototype.addMessage(contenido, "Me", new Date().toISOString(), true);
				}
			});
}

ChatSocked.prototype.addMessage = function(msg, sender, date, self) {

	if(self) var classDiv = "row message self";
	else var classDiv = "row message";
	$("#chatEntries").append('<div class="'+classDiv+'"><p class="infos"><span class="pseudo">'+sender+'</span>, <time class="date" title="'+date+'">'+jQuery.timeago(date)+'</time></p><p>' + msg + '</p></div>');
}


//var chatHistory = {};
//if (_.size(chatHistory[socket.room]) > 10) {
//chatHistory[socket.room].splice(0,1);
//else
//chatHistory[socket.room].push(people[socket.id].name + ": " + msg);

var chatSocked = new ChatSocked()
chatSocked.connect()
