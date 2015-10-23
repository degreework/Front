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

// funcion fachada para emitir pedidos
ChatSocked.prototype.sentMessage = function(tipo, data){
	//console.log('sentMessage')
	
	ChatSocked.prototype.socked.emit(tipo, data);
}


// funcion donde renderiza la lista de usuarios y escucha los mensajes enviados s
ChatSocked.prototype.listen = function(){

	try{
	ChatSocked.prototype.socked.on('nbUsers', function(msg) {
		
		console.log(msg)
		
		// envia las peticiones de historial cuando recarga la pagina
		currentChats = JSON.parse(sessionStorage.getItem('currentChats'))
     	for (var i = 0; i < currentChats.chats.length; i++) {
     		var chat = JSON.parse(currentChats.chats[i])
     		ChatSocked.prototype.sentMessage('chat_history', {'room': chat.from+','+chat.to, 'to':chat.to, 'from':chat.from})
     	}

		// coloca los usuarios en la lista del chat 		
		$("#main-sort-chat").empty();
		$( "#users-header-num" ).text( msg.length-1 );
		user = JSON.parse(localStorage.getItem('user'))

		if (msg.length >0) {
			for (var i = 0; i < msg.length; i++) {

				if (user.first_name !== msg[i].first_name && user.last_name !== msg[i].last_name) {
					
					main_set_dialog( msg[i].id );
					main_append_dialog( msg[i].id );
	      			main_chat_user_new( msg[i].id, 'online', msg[i].first_name+' '+msg[i].last_name)			
				};
			};
		};
	});
	}catch(err) {
	console.log(err)}

	// envia mensaje en el chat global 
	$('#messageInputAll').keypress(function (e) {
		if (e.which == 13) {
			//console.log('envio todos')
			data = $(e.target).val()
			ChatSocked.prototype.sentMessage('messageAll' ,data)
			$(e.target).val('')
		}
	});

	//escucha los mensajes individuales 
	try{
	ChatSocked.prototype.socked.on('message', function(msg) {
		
		
		//console.log('me llego el mensaje');
		//console.log(msg);
		
		//pega el mini boton en la barra si no existe 
        if ( $( "#users-button-bar" ).parent().find( "#user-button-" + msg['from'] ).length == 0 ) {
          $( "#users-button-bar" ).append( "<button id='user-button-" + msg['from'] + "' class='user-button' style='font-size: 65%;'><li class='" + status + "'>" + msg['pseudo'] + "</li></button>" );
          $( ".user-button" ).button();
        }

        // reproduce el sonido 
        if( !$(document).is(document.activeElement) || !main.find( "#textarea_msg" ).is(document.activeElement) ) {
          //Do sound effect
          //if sounds has been disabled, dont do it
          if ( conf_sound_active == true )
            $( "#audio-popup" ).trigger( "play" );

          //Notificacion del mensaje no leido 
          main_chat_user_alert( msg['from'], 0 );
        }

        // se pega el mensaje 
        var main   = $( "#Dialog" + msg['from'] );
        append_msg_he( msg['message'], main, msg['pseudo'], new Date().toISOString(), msg['thumb'] );
        // FIXME  
      	//Set position
      	main.dialog( "option", "position", { my: "right bottom", at: "right top-3", of: "#user-button-"+msg['from'], collision: "flip, none" });
      	
      	// se verifica si el chat esta en la sesion de chats actuales 
      	ChatSocked.prototype.add_current_chat(msg['to'], msg['from'], msg['pseudo'])
      	
		
	});
	}catch(err) {
	console.log(err)}

	try{
	// escucha los mensajes del chat global 
	ChatSocked.prototype.socked.on('messageAll', function(msg) {
		
		//console.log('me llego el mensajeAll');
		//console.log(msg);
		
		ChatSocked.prototype.addMessage(msg['message'], msg['pseudo'], new Date().toISOString(), msg['thumb'][0], false);
		
	});
	}catch(err) {
	console.log(err)}


	try{
	// escucha las peticiones del historial global 
	ChatSocked.prototype.socked.on('send_History_Chat_All', function(msgs) {

		$('#chatAll').empty();
		for (var i = 0; i < msgs.length; i++) {
			//msgs[i]
			ChatSocked.prototype.addMessage(msgs[i].message, msgs[i].nameSender, msgs[i].date, msgs[i].thumb, false);
		};
		
	});
	}catch(err) {
	console.log(err)}

	
	try{
	// escucha las peticiones del historial de chats individuales 
	ChatSocked.prototype.socked.on('chat_history', function(msgs, from, to) {

		//console.log('chat_history')
		var main   = $( "#Dialog" + to );
		main.find('.direct-chat-messages').empty();
		//user = JSON.parse(localStorage.getItem('user'))
		for (var i = 0; i < msgs.length; i++) {
			//console.log(msgs[i].from +'==='+ from)
			if (parseInt(msgs[i].from) === parseInt(from)) {
				//console.log('if')
				append_msg_me(msgs[i].message, main, msgs[i].date);
			}else{
				//console.log('else')
				append_msg_he( msgs[i].message, main, msgs[i].nameSender, msgs[i].date, msgs[i].thumb );
			};
		};
		
	});
	}catch(err) {
	console.log(err)}
}

// funcion para pegar los mensajes en el chat global 
ChatSocked.prototype.addMessage = function(msg, sender, date, thumb, self) {

	if(self) var classDiv = " message self";
	else var classDiv = " message";
	
	$("#chatAll").append("\
          <div class='direct-chat-msg right' id='me'>\
            <div class='direct-chat-info clearfix'>\
              <span class='direct-chat-name pull-right'>" + sender + "</span>\
              <span class='direct-chat-timestamp pull-left'>" + get_format_date(date) + "</span>\
            </div>\
            <!--<img class='direct-chat-img' src='http://127.0.0.1:8080" + thumb + "' alt='message user image' />-->\
            <div class='direct-chat-text'>\
              <div>" + msg + "</div>\
            </div>\
          </div>");
}

// funcion que actualiza la sesion con los chat abiertos 
ChatSocked.prototype.add_current_chat = function(from, to, nameTo){
	
	currentChats = JSON.parse(sessionStorage.getItem('currentChats'))
	//console.log(currentChats.chats.indexOf('{"from":"'+from+'", "to":"'+to+'", "nameTo":"'+nameTo+'"}'))
	if(currentChats.chats.indexOf('{"from":"'+from+'", "to":"'+to+'", "nameTo":"'+nameTo+'"}' )=== -1){
		currentChats.chats.push('{"from":"'+from+'", "to":"'+to+'", "nameTo":"'+nameTo+'"}')
		ChatSocked.prototype.sentMessage('chat_history', {'room': from+','+to, 'to':to, 'from':from})
	}
	//console.log(currentChats)
	//console.log(currentChats.chats)
	sessionStorage.setItem('currentChats', JSON.stringify(currentChats)); 
}
	
	// se crea el objeto para manejar los chats 
	var chatSocked = new ChatSocked()
	try {
		chatSocked.connect()
	}catch(err) {
		console.log(err)
	}
