var Wiki = {};

Wiki.show_page_content = function (content, preview)
	{
		/*
		*Render wiki page data to view
		*/
		//set page's title
		$('.page_title').text(content.title);
		//set page content
		$("#markdown").html(marked(content.raw));

		if(preview)
		{
			
		//create element to edit button
		var container = document.createElement("div");
		var link = document.createElement("a");
		var title = document.createElement("spam");
		$(title).text("Editar")
		link.appendChild(title);
		//var id = content.id;

		container.appendChild(link);			

		//event handler
		$(link).click(function(e){
			e.preventDefault();
			//hidde edit button from view
			$(this).remove()

			//load wiki form
			var form_edit_wiki = $("#form_edit_wiki");
			create_form(URL_CREATE_PAGE_WIKI, form_edit_wiki, 'OPTIONS', Wiki.handle_update);
		
		});
		}

		$('.page_title').append(container)

	}


 Wiki.handle_update = function  () {	
	//remove from view current content (wiki page)
	$(".page_content").hide();

	//remove slug input from new form
	$("#id_slug").remove();

	//set current title to title input
	$("#id_title").val(WikiService.page.title)

	$("#id_markup").val('Markdown')

	//here should set current page content to raw input
	//show new form
	$(form_edit_wiki).show();
			
	//load markdown editor
	MarkdownEditor.load($('#editor'));

	//events handlers
	$(form_edit_wiki).submit(function  (e) {
		e.preventDefault();
		Wiki.show_page_content(WikiService.page);
		$("#form_edit_wiki").hide();
		
		//remove inputs, ALERT:dont delete this
		$("#id_slug").remove();
		$("#id_title").remove();
		$("#id_markup").remove();
		//show new content
		$(".page_content").show();
	})
}