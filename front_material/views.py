# -*- encoding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template.context import RequestContext

from decorators.ScopeRequired import ScopeRequired


#@ScopeRequired(["forum.can_view"])
def home(request, mod_slug):
    return render_to_response('materialHome.html', {'title': 'Material | Name App', 'mod_slug':mod_slug}, context_instance=RequestContext(request))

def create(request, mod_slug):
    return render_to_response('materialCreate.html', {'title': 'Material | Name App', 'mod_slug':mod_slug}, context_instance=RequestContext(request))

def view(request, mod_slug, id):
    return render_to_response('materialView.html', {'title': 'Material | Name App', 'mod_slug':mod_slug}, context_instance=RequestContext(request))
