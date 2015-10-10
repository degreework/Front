from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^(?P<mod_slug>.+)/resource/$', 'front_resource.views.resource', name='resource'),
        url(r'^(?P<mod_slug>.+)/resource/detail/(?P<id>\d+)$', 'front_resource.views.detail', name='detail'),
        url(r'^(?P<mod_slug>.+)/resource/create/$', 'front_resource.views.create', name='create'),
        url(r'^(?P<mod_slug>.+)/resource/edit/$', 'front_resource.views.edit', name='edit'),
)
