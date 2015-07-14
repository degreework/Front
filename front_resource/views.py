# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
def resource(request):
    return render_to_response('resource.html', {'title': 'resource | Name App'}, context_instance=RequestContext(request))


def detail(request,id):
    return render_to_response('resourceDetail.html', {'title': 'resource | Name App'}, context_instance=RequestContext(request))


def create(request):
    return render_to_response('resourceCreate.html', {'title': 'Create resource | Name App'}, context_instance=RequestContext(request))


def edit(request):
    return render_to_response('resourceEdit.html', {'title': 'Edit resource | Name App'}, context_instance=RequestContext(request))
