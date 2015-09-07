var WikiView = {};

//Class Attr
//WikiView.list_request : div with a list of requests

/*CREATE*/

WikiView.initialize = function(form, editor)
{
	/*
	* 1 - Set form name
	* 2 - Get form from service
	* 3 - WikiView.succes_create_form
	*/

	// 1 - Set form name
	WikiView.form_create = form;
	WikiView.editor = editor;

	//2 - Get form from service
	create_form(
		URL_CREATE_PAGE_WIKI,
		WikiView.form_create,
		'OPTIONS',
		WikiView.succes_create_form
	);

}


WikiView.succes_create_form = function()
{
	debug_info("3 - WikiView.succes_create_form")
	/*
	* 1 - Load Markup editor
	* 2 - add fields
	* 3 - Set events handler
	* 4 - Show form
	*/
    
    //1 - Load Markup editor
    debug_info("3.1 - Load Markup editor")
	//MarkdownEditor.load(WikiView.editor);
	MarkupEditor.load(WikiView.editor);

	//2 - hidde raw field
	debug_info("3.2 - add extra fields")
	WikiView.hidde_input_raw($("#id_raw"));

	//3 - Set events handler
	debug_info("3.3 - Set events handler")

		// -> generate slug
		$($("input[name=title]")[0]).keyup( function(){
			var title = $(this).val();
	        var url = $('input#id_slug');
	        $($("input[name=slug]")[0]).val(WikiView.slugter(title));
	    });
		$('#id_slug').hide()

	    //-> onsubmit
        WikiView.form_create.submit(function(e){
			e.preventDefault();
			
			WikiService.create_page(
				e.target,
				URL_CREATE_PAGE_WIKI,
				WikiView.create_succes
			);
        

		});


	//4 - Show form
	debug_info("3.4 - Show form")
	WikiView.form_create.show();
}

WikiView.create_succes = function(wiki)
{
	//debug_info("- create_succes")
	Notify.show_success("Wiki", "Página creada");

	var url = wiki.page.slug+'..'+JSON.parse(wiki.page.extra_data).parent;
	$("#url_wiki_request").attr('href', url);
	$("#editaded_page").fadeIn();
	$("#formContent").fadeOut()

}

WikiView.slugter = function (str)
{
	str = str.replace(/\s/g,'-');
	str = str.replace(/[^a-zA-Z0-9\s]/g,"-");
	str = str.toLowerCase();
	return str;
}

WikiView.hidde_input_raw = function(input)
{
	//set listener
	//append editor content to raw input
	$('textarea').keyup(function(e){
		$(input).val(WikiView.editor.val())
		//console.log(WikiView.editor.val())
    });
	input.hide();
}


/*RETRIEVE*/

WikiView.load_page = function(slug)
{
	debug_info("Load Page")

	var url = URL_DETAIL_ONE_PAGE + slug;
	WikiService.get_page(url, WikiView.render_page);
}


WikiView.load_version = function(version, slug)
{
	debug_info("Load version")

	var url = URL_VERSION_PAGE.replace(/\%slug%/g, slug);
	url = url.replace(/\%version%/g, version);

	WikiService.get_page(url, WikiView.render_version);
}


WikiView.render_version = function(page)
{
	$("#wiki_title").text(page.title);
	$("#wiki_version").text(page.version);
	$("#markdown").html(markdown.toHTML(page.raw));
	var url = location.origin+'/wiki/'+page.slug;
	
	//to approve a request
	var s = StorageClass.getInstance();
	if(-1 != s.storage.get("permissions").indexOf("wiki.delete_request")){

		var url_approv = URL_APPROVE_REQUEST.replace(/\%slug%/g, page.slug);
		url_approv = url_approv.replace(/\%version%/g, page.version);
		
		$("#submit_approved > a").click(function(e){
			WikiService.approve_request(url_approv, WikiView.approve_succes);
		});
		$("#submit_approved").show();
	}
	//end approve


	$("#show_current > a").attr('href', url)
	$("#show_current").show();
}


WikiView.render_page = function(page)
{
	console.log("render_page")
	console.log(page)
	$("#wiki_title").text(page.title);
	$("#wiki_version").text(page.version);
	$("#wiki_slug").text(page.slug)
	$("#markdown").html(markdown.toHTML(page.raw));


	/*Esto es para editarla*/
	var edit = document.createElement("a");
	edit.className = "pull-right"
	var edit_msg = document.createElement("span");
	edit_msg.className = "glyphicon glyphicon-edit"
	edit.appendChild(edit_msg);
	edit.addEventListener(
		'click',
		function(e){
			console.log("editar")
			create_form(
				URL_CREATE_PAGE_WIKI,
				$("#form_create_wiki"),
				'OPTIONS',
				call
			);
		}, false);
	$("#wiki_title").append(edit)

	
	//comments
	var comentariosWiki = new CommentView(
		page.id_thread,
		$("#form-comment-wiki"),
		$('#list-comment-wiki'),
		$(".load-comment-wiki")
	);		
	
	comentariosWiki.load();
	comentariosWiki.load_create_comment(page.id_thread);

}

function call()
{
	console.log("form creatted para ");
	var slug = $("#wiki_slug").text();
	//oculta los campos que no se necesitan
	$("#id_slug").remove();
	$("#id_raw").hide();

	//asigna el valor actual del titulo al input para el titulo
	$("#id_title").val($("#wiki_title").text())

	//asigna el valor del raw al editor
	$("#id_textarea").val($("#markdown").text())

	//asigna el valor del editor al raw
	$('textarea').keyup(function(e){
		$("#id_raw").val($(e.target).val());
    });

	$("#form_create_wiki").show();
	$("#wiki_title").fadeOut();
	$("#markdown").fadeOut();

	$("#form_create_wiki").submit(function(e){
		e.preventDefault();
		var url = URL_UPDATE_PAGE_WIKI.replace(/\%slug%/g, slug);
		WikiService.edit_page(e.target, url,
			function(response){
				$("#form_create_wiki").fadeOut();
				$("#editaded_page").fadeIn();
				var url = response.page.slug+'..'+JSON.parse(response.page.extra_data).parent;
				$("#url_wiki_request").attr('href', url);
			})

	});

				
}


WikiView.get_all_Pages = function()
{
	WikiService.get_list(URL_GET_LIST_APPROVED_PAGES, WikiView.render_all_pages);
}

WikiView.render_all_pages = function (response)
{
	WikiView.render_list($('.pages'), response);
}

WikiView.render_list = function(parent_container, response)
{
	for (i = 0; i < response.length; i++) { 		
		// se crea el html   
		console.log(response[i])  		

		var container = document.createElement("div");
		container.className = 'col-md-12 page_list'

		var br = document.createElement('br')
		var link = document.createElement("a");
		var id = response[i].page.id;
		var slug = response[i].page.slug;
		$(link).attr('href', host+":"+location.port+"/wiki/"+slug);

		var title_page = document.createElement("span");
		$(title_page).css('font-size','24px')
		var date = document.createElement("span");
		//se asigna el texto 
		$(title_page).text(response[i].page.title)
		$(date).text("Última edición "+jQuery.timeago(response[i].author.created_at));

		//se pega a los contenedores 
		link.appendChild(title_page)
		container.appendChild(link);
		container.appendChild(br);
		container.appendChild(date);
		
		parent_container.prepend(container);
	}
}


/* REQUESTS */
WikiView.show_all_request = function(container)
{
	WikiService.get_list(URL_GET_ALL_WIKI_REQUEST, WikiView.render_request)
	WikiView.list_request = container;
}

WikiView.render_request = function(list)
{
	console.log(list)
	for (i = 0; i < list.length; i++) {

		var id = list[i].id;
		var page = list[i].page;
		var commit = list[i].commit;

		var url = 'create/'+page.slug+'..'+commit;
		

		var container = document.createElement("li");
		
		var div = document.createElement("div");
		div.className = 'col-md-12 page_list'

		var title = document.createElement("span");
		$(title).text(page.title);
		title.className = 'lead';

		var description = document.createElement("span");


		$(description).text(' Esta pagina tiene una solicitud de modificación y espera para ser aprobada ');
		var br = document.createElement('br')
		var link = document.createElement("a");
		
		$(link).attr('href', url);
		
		//se asigna el texto 
		$(link).text("ver")

		div.appendChild(title);
		div.appendChild(br);
		div.appendChild(description);
		div.appendChild(link);
		container.appendChild(div)
		
		WikiView.list_request.prepend(div);
	}
}

WikiView.approve_succes = function(approve)
{
	Notify.show_success("Wiki", "Éste contenido ha sido aprobado");
}


/*History*/

WikiView.show_all_history = function(container)
{
	WikiService.get_list(URL_GET_ALL_WIKI_HISTORY, WikiView.render_history)
	WikiView.list_history = container;
}

WikiView.render_history = function(list)
{
	console.log("WikiView:render_history")
	console.log(list)

	for (i = 0; i < list.length; i++) {

		var id = list[i].id;
		var page = list[i].page;
		var commit = list[i].commit;

		var url = 'create/'+page.slug+'..'+commit;
		

		var container = document.createElement("li");
		
		var div = document.createElement("div");
		div.className = 'col-md-12 page_list'

		//var title = document.createElement("span");
		//$(title).text(page.title);
		//title.className = 'lead';

		var description_author = document.createElement("span");
		var description_reviewed = document.createElement("span");


		$(description_author).text('Creado por '+list[i].author.fullname+' '+jQuery.timeago(list[i].author.created_at));
		$(description_reviewed).text('Aprobado por '+list[i].review.reviewer.fullname+' '+jQuery.timeago(list[i].review.approved.approved_at));
		
		var br = document.createElement('br')
		var link = document.createElement("a");
		
		$(link).attr('href', url);
		
		//se asigna el texto 
		$(link).text(page.title)

		//div.appendChild(title);
		div.appendChild(link)
		div.appendChild(br.cloneNode(true));
		div.appendChild(description_author);
		div.appendChild(br);
		div.appendChild(description_reviewed)
		container.appendChild(div)
		
		WikiView.list_history.prepend(div);
	}
}