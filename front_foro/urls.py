from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^module1/foro/$', 'front_foro.views.foro', name='foro'),
        url(r'^module1/foro/create/$', 'front_foro.views.create', name='create'),
        url(r'^module1/foro/edit/$', 'front_foro.views.edit', name='edit'),
)
