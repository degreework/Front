from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^foro/$', 'front_foro.views.foro', name='foro'),
        url(r'^foro/create/$', 'front_foro.views.create', name='create'),
        url(r'^foro/edit/$', 'front_foro.views.edit', name='edit'),
)
