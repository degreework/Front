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
	console.log("create_form")
	
	
	// -> generate slug
	$($("input[name=name]")[0]).keyup( function(){
		var title = $(this).val();
        var url = $('input#id_slug');
        $($("input[name=slug]")[0]).val(ModuleView.slugter(title));
    });

    form.submit(function(e){
		e.preventDefault();
		var data = new FormData($(this).get(0));
		
		console.log(data)
		var service = new ModuleService();
		service.create(
			URL_CREATE_MODULE,
			data,
			function(response){
				window.location.href = Module.getURL(response.slug);
			}
		);

	});

}

ModuleView.prototype.render_modules = function(container)
{
	this.service.list(
		URL_ALL_MODULES,
		function(response){
			//console.log(response)
			$.each(response.results, function(k,v){ModuleView._render_module(container, v)})
		})
}

ModuleView._render_module = function(container, module)
{
	$(container).append("<li><a href='"+Module.getURL(module.slug)+"'>"+module.name+"</a></li>")
}

ModuleView.slugter = function (str)
{
	str = str.replace(/\s/g,'-');
	str = str.replace(/[^a-zA-Z0-9\s]/g,"");
	str = str.toLowerCase();
	return str;
}


ModuleView.prototype.render_module_detail = function(slug, cnt_title, cnt_description)
{
	var url = URL_RETRIEVE_MODULE.replace(/\%slug%/g, slug);

	this.service.retrieve(
		url,
		function(response){
			$(cnt_title).text(response.name)
			$(cnt_description).text(response.description)			
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
