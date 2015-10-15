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


ChatSocked.prototype.sentMessage = function(tipo, data){
	console.log('sentMessage')
	
	ChatSocked.prototype.socked.emit(tipo, data);
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
				room.attr('id', 'room-'+$(e.target)[0].id)  
				$(room).find('#title_chat').text($($(e.target)[0]).attr('name'))
				$(room).find('#messageInput').attr('id', 'input-'+$(e.target)[0].id)
				$(room).appendTo( "#list-room" );
				$(room).show()
				ChatSocked.prototype.chat($(e.target)[0].id)

			})
		};
	});


	$('#messageInputAll').keypress(function (e) {
		if (e.which == 13) {
			console.log('envio todos')
			data = $(e.target).val()
			ChatSocked.prototype.sentMessage('messageAll' ,data)
			ChatSocked.prototype.addMessage(data, "Me", new Date().toISOString(), true);
			$(e.target).val('')
		}
	});

	//escucha el mensaje
	ChatSocked.prototype.socked.on('message', function(msg) {
		
		console.log('me llego el mensaje');
		console.log(msg);
		data = {'msg':msg['message'], 'to': msg['to']}
		ChatSocked.prototype.addMessageP2P(data, msg['pseudo'], new Date().toISOString(), false);
		
	});

	ChatSocked.prototype.socked.on('messageAll', function(msg) {
		
		console.log('me llego el mensajeAll');
		console.log(msg);
		//data = {'msg':msg['message'], 'to': msg['to']}
		ChatSocked.prototype.addMessage(msg['message'], msg['pseudo'], new Date().toISOString(), false);
		
	});
}

ChatSocked.prototype.chat = function(id){
	
	//para enviar
			$('#input-'+id).keypress(function (e) {
				if (e.which == 13) {
					
					console.log('envio')
					//console.log($(e.target).val())
					contenido = $(e.target).val()
					// se envia el mensaje 
					//ChatSocked.prototype.emit('message', contenido)
					data = {'msg':contenido, 'to': id}
					ChatSocked.prototype.sentMessage('message' ,data)

					
					//se pega el mensaje en el recuadro de chat
					ChatSocked.prototype.addMessageP2P(data, "Me", new Date().toISOString(), true);
					$(e.target).val('')
				}
			});
}

ChatSocked.prototype.addMessage = function(msg, sender, date, self) {

	if(self) var classDiv = " message self";
	else var classDiv = " message";
	$("#chatAll").append('<div class="'+classDiv+'"><p class="infos"><span class="pseudo">'+sender+'</span>, <time class="date" title="'+date+'">'+jQuery.timeago(date)+'</time></p><p>' + msg + '</p></div>');
}

ChatSocked.prototype.addMessageP2P = function(msg, sender, date, self) {

	console.log('addMessageP2P')
	console.log(msg)

	if(self) var classDiv = "message self";
	else var classDiv = "message";

	var room = $('#room-'+msg.to)
	
	if (room.length) {

		$(room).find('#chatEntries').append('<div class="'+classDiv+'"><p class="infos"><span class="pseudo">'+sender+'</span>, <time class="date" title="'+date+'">'+jQuery.timeago(date)+'</time></p><p>' + msg.msg + '</p></div>');
	}
	else{
		room = $( "#room" ).clone()
		
		room.attr('id', 'room-'+msg.to)
		$(room).find('#title_chat').text(sender)
		
		$(room).find('#messageInput').attr('id', 'input-'+msg.to)
		$(room).find('#chatEntries').append('<div class="'+classDiv+'"><p class="infos"><span class="pseudo">'+sender+'</span>, <time class="date" title="'+date+'">'+jQuery.timeago(date)+'</time></p><p>' + msg.msg + '</p></div>');
		$(room).appendTo( "#list-room" );
		$(room).show()
		ChatSocked.prototype.chat(msg.to)
		/**/

	};
	//
}

//var chatHistory = {};
//if (_.size(chatHistory[socket.room]) > 10) {
//chatHistory[socket.room].splice(0,1);
//else
//chatHistory[socket.room].push(people[socket.id].name + ": " + msg);

var chatSocked = new ChatSocked()
chatSocked.connect()
