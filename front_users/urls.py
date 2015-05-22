from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^$', 'front_users.views.index', name='index'),
)
