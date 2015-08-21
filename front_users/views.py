# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect

from decorators.ScopeRequired import ScopeRequired

def index(request):
    return render_to_response('index.html', {'title': 'Name App'}, context_instance=RequestContext(request))

def recoverPassword(request):
    return render_to_response('recoverPassword.html', {'title': 'Contraseña | Name App'}, context_instance=RequestContext(request))

@ScopeRequired(["users.change_user"])
def changePassword(request):
    return render_to_response('changePassword.html', {'title': 'Contraseña | Name App'}, context_instance=RequestContext(request))

@ScopeRequired(["users.can_view"])
def profile(request):
    return render_to_response('profile.html', {'title': 'Perfil | Name App'}, context_instance=RequestContext(request))

@ScopeRequired(["users.can_view"])
def detail(request,id):
    return render_to_response('userDetail.html', {'title': 'userDetail | Name App'}, context_instance=RequestContext(request))

@ScopeRequired(["users.change_user"])
def settings(request):
  return render_to_response('settings.html', {'title': 'Ajustes | Name App'}, context_instance=RequestContext(request))
  #return HttpResponseRedirect(reverse('front_users:authenticationRequiered'))
    

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
