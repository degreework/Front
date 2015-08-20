# Create your views here.
# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.contrib.auth.decorators import user_passes_test

def my_custom_authenticated(user):
    print "my_custom_authenticated"
    print request.session['scope']
    return True

from functools import wraps

def scope_required(function=None, scope=None, *args, **kwargs):
    print "membership_required"
    print function
    print kwargs
    print args

    @wraps(function)
    def decorator(request, scope, *args, **kwargs):
        print request.session.get('scope', None)
        return function(request, args, kwargs)
    return decorator

@scope_required(['wiki',])
def wiki(request, *args, **kwargs):
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