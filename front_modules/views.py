from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
def detail(request,id):
	return render_to_response('moduleDetail.html', {'title': 'module detail | Name App'}, context_instance=RequestContext(request))