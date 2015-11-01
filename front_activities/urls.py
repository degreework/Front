from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^(?P<mod_slug>.+)/activity/$', 'front_activities.views.activities', name='activities'),
        url(r'^(?P<mod_slug>.+)/activity/(?P<id>\d+)$', 'front_activities.views.detail', name='detail'),
        url(r'^(?P<mod_slug>.+)/activity/create/$', 'front_activities.views.create', name='create'),
)