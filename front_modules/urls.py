from django.conf.urls import patterns, url


urlpatterns = patterns('',
	url(r'^modules/new$', 'front_modules.views.create', name='create'),
	
	url(r'^modules/(?P<slug>.+)$', 'front_modules.views.detail', name='detail'),
)
