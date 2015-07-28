var WikiView = {};

//Class Attr
//WikiView.list_request : div with a list of requests

/*CREATE*/

WikiView.initialize = function(form, editor)
{
	debug_info("- initialize")
	/*
	* 1 - Set form name
	* 2 - Get form from service
	* 3 - WikiView.succes_create_form
	*/

	// 1 - Set form name
	debug_info("1 - Set form name")
	WikiView.form_create = form;
	WikiView.editor = editor;


	//2 - Get form from service
	debug_info("2 - Get form from service")
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


	    //-> onsubmit
        WikiView.form_create.submit(function(e){
			e.preventDefault();
			
			WikiService.create_page(
				e.target,
				URL_CREATE_PAGE_WIKI,
				WikiView.create_succes
			);
        	//$("#editaded_page").show();

		});


	//4 - Show form
	debug_info("3.4 - Show form")
	WikiView.form_create.show();
}

WikiView.create_succes = function(wiki)
{
	debug_info("- create_succes")
	Notify.show_success("OK", "Pagina creada");

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
	$("#show_current > a").attr('href', url)
	$("#show_current").show();
}


WikiView.render_page = function(page)
{
	$("#wiki_title").text(page.title);
	//$("#wiki_version").text(page.version);
	$("#markdown").html(markdown.toHTML(page.raw));

}


WikiView.get_all_Pages = function()
{
	WikiService.get_list(URL_GET_ALL_PAGES, WikiView.render_all_pages);
}

WikiView.render_all_pages = function (response)
{
	WikiView.render_list($('.pages'), response);
}

WikiView.render_list = function(parent_container, response)
{
	for (i = 0; i < response.length; i++) { 		
		// se crea el html     		
		var container = document.createElement("li");
		//container.className = 'question';
		var link = document.createElement("a");
		var id = response[i].id;
		var slug = response[i].slug;
		$(link).attr('href', host+":"+location.port+"/wiki/"+slug);
		//var titles = document.createElement("li");
		
		//se asigna el texto 
		$(link).text(response[i].title)

		//se pega a los contenedores 
		container.appendChild(link);
		//container.appendChild(titles);
		
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
		
		var title = document.createElement("span");
		$(title).text(page.title);
		title.className = 'lead';

		var description = document.createElement("span");


		$(description).text('tiene una solicitud de modificación en: ');
		
		var link = document.createElement("a");
		
		$(link).attr('href', url);
		
		//se asigna el texto 
		$(link).text(commit)

		container.appendChild(title);
		container.appendChild(description);
		container.appendChild(link);
		
		WikiView.list_request.prepend(container);
	}
}