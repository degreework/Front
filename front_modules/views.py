from django.shortcuts import render_to_response
from django.template.context import RequestContext

from decorators.ScopeRequired import ScopeRequired

# Create your views here.

@ScopeRequired(["module.can_view"])
def detail(request, slug):
	return render_to_response('moduleHome.html', {'title': 'module detail | Name App', 'mod_slug': slug}, context_instance=RequestContext(request) )

@ScopeRequired(["module.add_module"])
def create(request):
	return render_to_response('moduleCreate.html', {'title': 'Create module | Name App', 'mod_slug': 'none'}, context_instance=RequestContext(request))