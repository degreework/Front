from django.conf.urls import patterns, url


urlpatterns = patterns('',
	url(r'^modules/detail/(?P<id>\d+)$', 'front_modules.views.detail', name='detail'),
)
