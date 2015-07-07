# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
def foro(request):
    return render_to_response('foro.html', {'title': 'foro | Name App'}, context_instance=RequestContext(request))


def create(request):
    return render_to_response('foroCreate.html', {'title': 'Create Foro | Name App'}, context_instance=RequestContext(request))


def edit(request):
    return render_to_response('Foroedit.html', {'title': 'Edit Foro | Name App'}, context_instance=RequestContext(request))
