# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

from decorators.ScopeRequired import ScopeRequired


@ScopeRequired(["forum.can_view"])
def foro(request, mod_slug):
    return render_to_response('foroList.html', {'title': 'foro | Name App', 'mod_slug':mod_slug}, context_instance=RequestContext(request))

@ScopeRequired(["forum.can_view"])
def detail(request, mod_slug, id):
    return render_to_response('askDetail.html', {'title': 'foro | Name App', 'mod_slug':mod_slug}, context_instance=RequestContext(request))

@ScopeRequired(["forum.add_ask"])
def create(request, mod_slug):
    return render_to_response('foroCreate.html', {'title': 'Create Foro | Name App', 'mod_slug':mod_slug}, context_instance=RequestContext(request))
