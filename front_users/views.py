# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext


def index(request):
    return render_to_response('index.html', {'title': 'Name App'}, context_instance=RequestContext(request))


def recoverPassword(request):
    return render_to_response('recoverPassword.html', {'title': 'Contraseña | Name App'}, context_instance=RequestContext(request))


def changePassword(request):
    return render_to_response('changePassword.html', {'title': 'Contraseña | Name App'}, context_instance=RequestContext(request))


def profile(request):
    return render_to_response('profile.html', {'title': 'Perfil | Name App'}, context_instance=RequestContext(request))


def settings(request):
    return render_to_response('settings.html', {'title': 'Ajustes | Name App'}, context_instance=RequestContext(request))
