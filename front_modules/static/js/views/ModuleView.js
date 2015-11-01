var ModuleView = function(){
	this.service = new ModuleService();
}
ModuleView.prototype.initialize = function(form)
{
	create_form(
		URL_CREATE_MODULE,
		form,
		'OPTIONS',
		ModuleView.succes_create_form
	);
}

ModuleView.succes_create_form = function(form)
{
	//console.info("create_form")
	// -> generate slug
	$($("input[name=name]")[0]).keyup( function(){
		var title = $(this).val();
        var url = $('input#id_slug');
        $($("input[name=slug]")[0]).val(ModuleView.slugter(title));
    });

    //render values (if there is any)
    var name = $($("#module_name")[0]).text();
    var description = $($("#module_description")[0]).text();

    if (name)
    {	$($("input[name=name]")[0]).val( name )
    	$($("input[name=description]")[0]).val( description )
 	   	var slug = location.pathname.split("/");
		slug = slug[slug.length-1];
    	$($("input[name=slug]")[0]).remove();
	}
    
    //end render

    $(form).fadeIn();

    form.submit(function(e){
		e.preventDefault();
		//remove all empty fields from form
		$(this).find(":input").filter(function(){ return !this.value; }).remove()
		//end remove
		
		var action = e.target.action.split("/");
		action = action[action.length-1];
		
		console.log($(this).get(0))
		var data = new FormData($(this).get(0));
		var service = new ModuleService();
		var url = "";

		if("edit" == action)
		{
			url = URL_UPDATE_MODULE.replace(/\%slug%/g, slug);
			service.update(
			url,
			data,
			function(response){
				window.location.href = Module.getURL_from_slug(slug);
				}
			);
		}
		else if("create" == action)
		{
			url = URL_CREATE_MODULE;
			service.create(
			url,
			data,
			function(response){
				window.location.href = Module.getURL_from_slug(response.slug);
				}
			);
		}

	});

}

ModuleView.prototype.render_modules = function(container)
{
	//console.info(container)
	this.service.list(
		URL_ALL_MODULES,
		function(response){
			//console.log(response)
			$.each(response.results, function(k,v){ModuleView._render_module(container, v)})
		})
}

ModuleView._render_module = function(container, module)
{
	/*render list of modules*/
	$(container).append("<li id='id_mod-"+module.id+"'><a href='"+Module.getURL_from_slug(module.slug)+"'>"+module.name+"</a></li>")
}

ModuleView.slugter = function (str)
{
	str = str.replace(/\s/g,'-');
	str = str.replace(/[^a-zA-Z0-9\s]/g,"");
	str = str.toLowerCase();
	return str;
}


ModuleView.prototype.render_module_detail = function(slug, cnt_title, cnt_description, cnt_actions, cnt_image, form_edit)
{
	var url = URL_RETRIEVE_MODULE.replace(/\%slug%/g, slug);
	var THIS = this;

	this.service.retrieve(
		url,
		function(response){
			$(cnt_title).text(response.name);
			$(cnt_description).text(response.description);
			$(cnt_image).attr('src', response.photo)

			$(cnt_actions).click(function (e) {
				e.preventDefault();
				THIS.initialize(form_edit);
				$('#module_edit').show();
				$('#container_module_detail').hide();
				
			})
		})
}

ModuleView.prototype.render_module_name = function(slug, container)
{
	var url = URL_RETRIEVE_MODULE.replace(/\%slug%/g, slug);

	this.service.retrieve(
		url,
		function(response){
			console.log(response)
			$(container).text(response.name)
		})
}
