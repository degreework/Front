# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect

from django.conf import settings
API_SERVER = settings.API_SERVER

if not settings.DEBUG:
  import requests_unixsocket
  requests_unixsocket.monkeypatch()

from decorators.ScopeRequired import ScopeRequired

def index(request):
    return render_to_response('index.html', {'title': 'Name App'}, context_instance=RequestContext(request))

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

@ScopeRequired(["users.can_list"])
def listUsers(request):
    return render_to_response('listUsers.html', {'title': 'lista de Usuarios | Name App'}, context_instance=RequestContext(request))
    

def authentication_requiered(request):
    return render_to_response('authenticationRequiered.html', {'title': 'Autenticacion | Name App'}, context_instance=RequestContext(request))


from django.http import HttpResponse
import requests
from django.views.decorators.csrf import csrf_exempt

from django.core.exceptions import PermissionDenied
@csrf_exempt
def permissions(request):
  """
  return a list of permissions given a User (Token)
  """
  token = request.POST.get('Token', None)
  if None == token:
    raise PermissionDenied

  p = requests.get(API_SERVER+'/API/users/permissions/'+token)
  request.session['scope'] = p.content
  request.session.set_expiry(52560000)
  request.session.save()
  return HttpResponse(p)


def password_confirm(request, uidb64=None, token=None):
  return render_to_response('password_confirm.html', {'title': 'Ajustes | Name App', 'uidb64':uidb64, 'token': token}, context_instance=RequestContext(request))

def recoverPassword(request):
    return render_to_response('password_reset.html', {'title': 'Contraseña | Name App'}, context_instance=RequestContext(request))