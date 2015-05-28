from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^$', 'front_users.views.index', name='index'),
        url(r'^recoverPassword/$', 'front_users.views.recoverPassword', name='recoverPassword'),
        url(r'^profile/$', 'front_users.views.profile', name='profile'),
        url(r'^settings/$', 'front_users.views.settings', name='settings'),

)
