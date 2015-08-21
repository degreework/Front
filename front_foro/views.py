# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

from decorators.ScopeRequired import ScopeRequired


@ScopeRequired(["forum.can_view"])
def foro(request):
    return render_to_response('foroList.html', {'title': 'foro | Name App'}, context_instance=RequestContext(request))

@ScopeRequired(["forum.can_view"])
def detail(request,id):
    return render_to_response('askDetail.html', {'title': 'foro | Name App'}, context_instance=RequestContext(request))

@ScopeRequired(["forum.add_ask"])
def create(request):
    return render_to_response('foroCreate.html', {'title': 'Create Foro | Name App'}, context_instance=RequestContext(request))

@ScopeRequired(["forum.change_ask"])
def edit(request):
    return render_to_response('Foroedit.html', {'title': 'Edit Foro | Name App'}, context_instance=RequestContext(request))
