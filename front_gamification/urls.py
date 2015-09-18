from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^gamification/badges$', 'front_gamification.views.badge', name='badge'),
        url(r'^gamification/badges/detail/(?P<id>\d+)$', 'front_gamification.views.badgeDetail', name='detail_badge'),
        url(r'^gamification/badges/create/$', 'front_gamification.views.badgeCreate', name='create_badge'),
    
    	url(r'^gamification/award$', 'front_gamification.views.award', name='award'),

    	url(r'^gamification/scores/$', 'front_gamification.views.scores', name='scores'),
)