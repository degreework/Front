from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^evaluations/$', 'front_evaluations.views.evaluations', name='evaluations'),
        url(r'^evaluations/detail/(?P<id>\d+)$', 'front_evaluations.views.detail', name='detail'),
        url(r'^evaluations/create/$', 'front_evaluations.views.create', name='create'),
        url(r'^evaluations/edit/$', 'front_evaluations.views.edit', name='edit'),
)