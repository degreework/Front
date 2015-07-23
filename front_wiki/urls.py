from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^wiki/$', 'front_wiki.views.wiki', name='wiki'),
        url(r'^wiki/404$', 'front_wiki.views.no_found', name='404'),
        url(r'^wiki/create/$', 'front_wiki.views.create', name='create'),
        

        url(r'^wiki/history/(?P<id>\d+)$', 'front_wiki.views.history', name='history'),
        url(r'^wiki/request$', 'front_wiki.views.request', name='request'),
        
        #must be last urls
        url(r'^wiki/(?P<slug>[a-zA-Z0-9-_\/]+)$', 'front_wiki.views.detail', name='detail'),
        url(r'^wiki/(?P<slug>[a-zA-Z0-9-_\/]+)\.\.(?P<version>[0-9a-f\^]{4,40})$', 'front_wiki.views.detail', name='create_request'),
)
