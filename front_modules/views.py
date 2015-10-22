from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
def detail(request, slug):
	return render_to_response('template_module_detail.html', {'title': 'module detail | Name App', 'mod_slug': slug}, context_instance=RequestContext(request) )

def create(request):
	return render_to_response('module_create.html', {'title': 'Create module | Name App'}, context_instance=RequestContext(request))