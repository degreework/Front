from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^forum/$', 'front_foro.views.foro', name='foro'),
        url(r'^forum/detail/(?P<id>\d+)$', 'front_foro.views.detail', name='detail'),
        url(r'^forum/create/$', 'front_foro.views.create', name='create'),
        url(r'^forum/edit/$', 'front_foro.views.edit', name='edit'),
)
