# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect


def index(request):
    return render_to_response('index.html', {'title': 'Name App'}, context_instance=RequestContext(request))


def recoverPassword(request):
    return render_to_response('recoverPassword.html', {'title': 'Contraseña | Name App'}, context_instance=RequestContext(request))


def changePassword(request):
    return render_to_response('changePassword.html', {'title': 'Contraseña | Name App'}, context_instance=RequestContext(request))


def profile(request):
    return render_to_response('profile.html', {'title': 'Perfil | Name App'}, context_instance=RequestContext(request))

def detail(request,id):
    return render_to_response('userDetail.html', {'title': 'userDetail | Name App'}, context_instance=RequestContext(request))


import json
def settings(request):

    if 'HTTP_AUTHORIZATION' in request.META:
              auth = request.META['HTTP_AUTHORIZATION'].split()
              if len(auth) == 2:
                      if auth[0].lower() == "basic":
                              username, password = base64.b64decode(auth[1]).split(':', 1)
                              print username
                              print password

    print "------"


    if 'HTTP_COOKIE' in request.META:
        print "Autorizado"
        auth = request.META['HTTP_COOKIE'].split()
        print auth

        return render_to_response('settings.html', {'title': 'Ajustes | Name App'}, context_instance=RequestContext(request))


        if auth['Token']:
            print "CCCCCCCCCCCC"
        """
        if 'Token' in auth:
            return render_to_response('settings.html', {'title': 'Ajustes | Name App'}, context_instance=RequestContext(request))
        else:    
            return HttpResponseRedirect(reverse('front_users:authenticationRequiered'))
        """
    else:
        return HttpResponseRedirect(reverse('front_users:authenticationRequiered'))
    

def authentication_requiered(request):
    return render_to_response('authenticationRequiered.html', {'title': 'Autenticacion | Name App'}, context_instance=RequestContext(request))


from django.http import HttpResponse
import requests
from django.views.decorators.csrf import csrf_exempt

from django.core.exceptions import PermissionDenied
@csrf_exempt
def permissions(request):
  print("permissions")
  print(request.POST)
  token = request.POST.get('Token', None)
  if None == token:
    raise PermissionDenied

  p = requests.get('http://127.0.0.1:8080/API/users/permissions/'+token)
  request.session['scope'] = p.content
  print(request.session['scope'])
  return HttpResponse(p)
