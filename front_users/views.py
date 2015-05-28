from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.


def index(request):
    return render_to_response('index.html', context_instance=RequestContext(request))


def login(request):
    return render_to_response('login.html', context_instance=RequestContext(request))


def register(request):
    return render_to_response('register.html', context_instance=RequestContext(request))


def recoverPassword(request):
    return render_to_response('recoverPassword.html', context_instance=RequestContext(request))


def profile(request):
    return render_to_response('profile.html', context_instance=RequestContext(request))


def settings(request):
    return render_to_response('settings.html', context_instance=RequestContext(request))
