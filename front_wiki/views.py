# Create your views here.
# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
def wiki(request):
    return render_to_response('wikiList.html', {'title': 'Wiki | Name App'}, context_instance=RequestContext(request))


def detail(request, *args, **kwargs):
    return render_to_response('detailPage.html', {'title': 'Wiki page | Name App'}, context_instance=RequestContext(request))


def create(request):
    return render_to_response('wikiCreate.html', {'title': 'Create page | Name App'}, context_instance=RequestContext(request))

def request(request):
    return render_to_response('wikiRequest.html', {'title': 'Request edition | Name App'}, context_instance=RequestContext(request))

def history(request, id):
    return render_to_response('historyPage.html', {'title': 'History | Name App'}, context_instance=RequestContext(request))

def no_found(request):
    return render_to_response('404.html', {'title': 'No encontrado | Name App'}, context_instance=RequestContext(request))