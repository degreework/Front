# Create your views here.
# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext


from decorators.ScopeRequired import ScopeRequired


@ScopeRequired(["waliki.view_page"])
def wiki(request, mod_slug, *args, **kwargs):
    return render_to_response('wikiList.html', {'title': 'Wiki | Name App', 'mod_slug': mod_slug }, context_instance=RequestContext(request))

@ScopeRequired(["waliki.view_page"])
def detail(request, mod_slug, *args, **kwargs):
    return render_to_response('wikiPage.html', {'title': 'Wiki page | Name App', 'mod_slug': mod_slug}, context_instance=RequestContext(request))

@ScopeRequired(["waliki.add_page"])
def create(request, mod_slug):
    return render_to_response('wikiCreate.html', {'title': 'Create page | Name App', 'mod_slug': mod_slug}, context_instance=RequestContext(request))

@ScopeRequired(["waliki.view_page"])
def request(request, mod_slug):
    return render_to_response('wikiRequest.html', {'title': 'Request edition | Name App', 'mod_slug': mod_slug}, context_instance=RequestContext(request))

@ScopeRequired(["waliki.view_page"])
def history(request, mod_slug):
    return render_to_response('wikiHistoryPage.html', {'title': 'History | Name App', 'mod_slug': mod_slug}, context_instance=RequestContext(request))

def no_found(request):
    return render_to_response('404.html', {'title': 'No encontrado | Name App'}, context_instance=RequestContext(request))