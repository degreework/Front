# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
def activities(request):
    return render_to_response('listActivities.html', {'title': 'activities | Name App'}, context_instance=RequestContext(request))


def detail(request,id):
    return render_to_response('activityDetail.html', {'title': 'activity Detail | Name App'}, context_instance=RequestContext(request))


def create(request):
    return render_to_response('activityCreate.html', {'title': 'Create activity | Name App'}, context_instance=RequestContext(request))


def edit(request):
    return render_to_response('activityEdit.html', {'title': 'Edit Foro | Name App'}, context_instance=RequestContext(request))
