# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
def evaluations(request):
    return render_to_response('listEvaluations.html', {'title': 'evaluation | Name App'}, context_instance=RequestContext(request))


def detail(request,id):
    return render_to_response('evaluationDetail.html', {'title': 'evaluation | Name App'}, context_instance=RequestContext(request))


def create(request):
    return render_to_response('evaluationCreate.html', {'title': 'Create evaluation | Name App'}, context_instance=RequestContext(request))


def edit(request):
    return render_to_response('evaluationEdit.html', {'title': 'Edit evaluation | Name App'}, context_instance=RequestContext(request))
