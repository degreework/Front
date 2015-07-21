from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^resource/$', 'front_resource.views.resource', name='resource'),
        url(r'^resource/detail/(?P<id>\d+)$', 'front_resource.views.detail', name='detail'),
        url(r'^resource/create/$', 'front_resource.views.create', name='create'),
        url(r'^resource/edit/$', 'front_resource.views.edit', name='edit'),
)