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

	try{
		ChatSocked.prototype.socked.emit(name, data);
	}catch(err) {
	console.log(err)
}
}


ChatSocked.prototype.sentMessage = function(tipo, data){
	console.log('sentMessage')
	
	ChatSocked.prototype.socked.emit(tipo, data);
}


// funcion donde renderiza la lista de usuarios y escucha los mensajes enviados s
ChatSocked.prototype.listen = function(){
	
	try{
	ChatSocked.prototype.socked.on('nbUsers', function(msg) {
		
		console.log(msg)
		
		$("#main-sort-chat").empty();
		$( "#users-header-num" ).text( msg.length-1 );
		user = JSON.parse(localStorage.getItem('user'))

		if (msg.length >0) {
			for (var i = 0; i < msg.length; i++) {

				if (user.first_name !== msg[i].first_name && user.last_name !== msg[i].last_name) {
					
					//coloca los usuarios en la lista del chat				
					main_set_dialog( msg[i].id );
					main_append_dialog( msg[i].id );
	      			main_chat_user_new( msg[i].id, 'online', msg[i].first_name)			
					//var elemento = ('<a href="#" id="chat'+msg[i].id+'"> <div id ="'+msg[i].id+'" name="'+msg[i].first_name+' '+msg[i].last_name+'"> '+msg[i].first_name+' '+msg[i].last_name+'</div> </a>')
					//<img src="http://127.0.0.1:8080'+msg[i].thumb[0]+'"/>
					//$("#list_chat").append(elemento)
				
				};
			};

			
			// para cada cuadrito de chat
			/*$('#chat'+msg[i].id).click(function(e){

				//console.log($(e.target)[0].id)
				var room = $( "#room" ).clone()
				room.attr('id', 'room-'+$(e.target)[0].id)  
				$(room).find('#title_chat').text($($(e.target)[0]).attr('name'))
				$(room).find('#messageInput').attr('id', 'input-'+$(e.target)[0].id)
				$(room).appendTo( "#list-room" );
				$(room).show()
				ChatSocked.prototype.chat($(e.target)[0].id)

			})*/
		};
	});
	}catch(err) {
	console.log(err)}

	$('#messageInputAll').keypress(function (e) {
		if (e.which == 13) {
			console.log('envio todos')
			data = $(e.target).val()
			ChatSocked.prototype.sentMessage('messageAll' ,data)
			ChatSocked.prototype.addMessage(data, "Yo", new Date().toISOString(), true);

			$(e.target).val('')
		}
	});

	//escucha el mensaje
	try{
	ChatSocked.prototype.socked.on('message', function(msg) {
		
		console.log('me llego el mensaje');
		console.log(msg);
		//data = {'msg':msg['message'], 'to': msg['to']}
		//ChatSocked.prototype.addMessageP2P(data, msg['pseudo'], new Date().toISOString(), false);
		//Check focus state and focus document to do sound and alert
		
		//Append div user in the bar if is not appended
        if ( $( "#users-button-bar" ).parent().find( "#user-button-" + msg['from'] ).length == 0 ) {
          $( "#users-button-bar" ).append( "<button id='user-button-" + msg['from'] + "' class='user-button' style='font-size: 65%;'><li class='" + status + "'>" + msg['pseudo'] + "</li></button>" );
          $( ".user-button" ).button();
        }

        if( !$(document).is(document.activeElement) || !main.find( "#textarea_msg" ).is(document.activeElement) ) {
          //Do sound effect
          //if sounds has been disabled, dont do it
          if ( conf_sound_active == true )
            $( "#audio-popup" ).trigger( "play" );

          //Add notification if not exist
          main_chat_user_alert( msg['from'], 0 );
        }

        var main   = $( "#Dialog" + msg['from'] );
        append_msg_he( msg['message'], main, msg['pseudo'], new Date().toISOString(), msg['thumb'] );
        // FIXME  
      	//Set position
      	main.dialog( "option", "position", { my: "right bottom", at: "right top-3", of: "#user-button-"+msg['from'], collision: "flip, none" });
      	
		
	});
	}catch(err) {
	console.log(err)}

	try{
	ChatSocked.prototype.socked.on('messageAll', function(msg) {
		
		console.log('me llego el mensajeAll');
		console.log(msg);
		//data = {'msg':msg['message'], 'to': msg['to']}
		ChatSocked.prototype.addMessage(msg['message'], msg['pseudo'], new Date().toISOString(), false);
		
	});
	}catch(err) {
	console.log(err)}
}

/*
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
}*/

ChatSocked.prototype.addMessage = function(msg, sender, date, self) {

	if(self) var classDiv = " message self";
	else var classDiv = " message";
	
	//$("#chatAll").append('<div class="'+classDiv+'"><p class="infos"><span class="pseudo">'+sender+'</span>, <time class="date" title="'+date+'">'+jQuery.timeago(date)+'</time></p><p>' + msg + '</p></div>');
	$("#chatAll").append("\
          <div class='direct-chat-msg right' id='me'>\
            <div class='direct-chat-info clearfix'>\
              <span class='direct-chat-name pull-right'>" + sender + "</span>\
              <span class='direct-chat-timestamp pull-left'>" + get_format_date(date) + "</span>\
            </div>\
            <img class='direct-chat-img' src='http://127.0.0.1:8080" + user.thumb[0] + "' alt='message user image' />\
            <div class='direct-chat-text'>\
              <div>" + msg + "</div>\
            </div>\
          </div>");
}

/*
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
		/*

	//};
	//
}*/

//var chatHistory = {};
//if (_.size(chatHistory[socket.room]) > 10) {
//chatHistory[socket.room].splice(0,1);
//else
//chatHistory[socket.room].push(people[socket.id].name + ": " + msg);
	
	var chatSocked = new ChatSocked()
try {
	chatSocked.connect()
}catch(err) {
	console.log(err)
}
