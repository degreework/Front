from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^(?P<mod_slug>.+)/forum/$', 'front_foro.views.foro', name='foro'),
        url(r'^(?P<mod_slug>.+)/forum/(?P<id>\d+)$', 'front_foro.views.detail', name='detail'),
        url(r'^(?P<mod_slug>.+)/forum/create/$', 'front_foro.views.create', name='create'),
)
