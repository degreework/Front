# Create your views here.
# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
def wiki(request):
    return render_to_response('wiki.html', {'title': 'wiki | Name App'}, context_instance=RequestContext(request))


def detail(request,id):
    return render_to_response('detailPage.html', {'title': 'wiki page | Name App'}, context_instance=RequestContext(request))


def create(request):
    return render_to_response('wikiCreate.html', {'title': 'Create wiki | Name App'}, context_instance=RequestContext(request))


def edit(request):
    return render_to_response('wikiEdit.html', {'title': 'edit wiki | Name App'}, context_instance=RequestContext(request))
