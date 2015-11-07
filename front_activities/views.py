# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

from decorators.ScopeRequired import ScopeRequired


@ScopeRequired(["activitie.can_view"])
def activities(request, mod_slug):
    return render_to_response('activitieList.html', {'title': 'activities | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))

@ScopeRequired(["activitie.can_view"])
def activitiesList(request, mod_slug):
    return render_to_response('listActivitie.html', {'title': 'activities | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


@ScopeRequired(["activitie.can_view"])
def detail(request, mod_slug, id):
    return render_to_response('parent/activity_parent_Detail.html', {'title': 'Detail Activiti | Name App', 'mod_slug':mod_slug}, context_instance=RequestContext(request))


@ScopeRequired(["activitie.add_activitieparent"])
def create(request, mod_slug):
    return render_to_response('parent/activity_parent_Create.html', {'title': 'Create Activitie | Name App', 'mod_slug':mod_slug}, context_instance=RequestContext(request))
