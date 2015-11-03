# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

from decorators.ScopeRequired import ScopeRequired


def home_gamification(request):
    return render_to_response('gamification_home.html', {'title': 'gamification | Name App'}, context_instance=RequestContext(request))


def badge(request):
    return render_to_response('listBadges.html', {'title': 'gamification | Name App'}, context_instance=RequestContext(request))


def badgeDetail(request,id):
    return render_to_response('detailBadge.html', {'title': 'gamification | Name App'}, context_instance=RequestContext(request))


def award(request):
    return render_to_response('listAwards.html', {'title': 'gamification | Name App'}, context_instance=RequestContext(request))


def scores_quiz(request):
    return render_to_response('scores_quiz.html', {'title': 'gamification | Name App'}, context_instance=RequestContext(request))


def scores_activitie(request):
    return render_to_response('scores_activitie.html', {'title': 'gamification | Name App'}, context_instance=RequestContext(request))
