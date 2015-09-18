# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext


def activities(request):
    return render_to_response('listActivities.html', {'title': 'activities | Name App'}, context_instance=RequestContext(request))

#Parent Activities
def detail(request,id):
    return render_to_response('parent/activity_parent_Detail.html', {'title': 'Detail Activiti | Name App'}, context_instance=RequestContext(request))


def create(request):
    return render_to_response('parent/activity_parent_Create.html', {'title': 'Create Activitie | Name App'}, context_instance=RequestContext(request))


def edit(request):
    return render_to_response('parent/activity_parent_Edit.html', {'title': 'Edit Activitie | Name App'}, context_instance=RequestContext(request))


#Child Activities

def list(request, id):
    return render_to_response('child/list_activities_child.html', {'title': 'Detail Activiti | Name App'}, context_instance=RequestContext(request))

def send(request):
    return render_to_response('child/activity_child_Create.html', {'title': 'Create Activitie | Name App'}, context_instance=RequestContext(request))