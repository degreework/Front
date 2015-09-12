from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^activity/$', 'front_activities.views.activities', name='activities'),
        url(r'^activity/(?P<id>\d+)$', 'front_activities.views.detail', name='detail'),
        url(r'^activity/create/$', 'front_activities.views.create', name='create'),

        url(r'^activity/edit/$', 'front_activities.views.send', name='send'),
        #url(r'^activity/list$', 'front_activities.views.list', name='edit'),
)