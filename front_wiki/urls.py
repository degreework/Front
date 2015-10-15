from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^(?P<mod_slug>.+)/wiki/$', 'front_wiki.views.wiki', name='wiki'),
        url(r'^wiki/404$', 'front_wiki.views.no_found', name='404'),
        url(r'^(?P<mod_slug>.+)/wiki/create/$', 'front_wiki.views.create', name='create'),
        

        url(r'^(?P<mod_slug>.+)/wiki/history$', 'front_wiki.views.history', name='history'),
        url(r'^(?P<mod_slug>.+)/wiki/request$', 'front_wiki.views.request', name='request'),
        
        #must be last urls
        url(r'^(?P<mod_slug>.+)/wiki/(?P<slug>[a-zA-Z0-9-_\/]+)$', 'front_wiki.views.detail', name='detail'),
        url(r'^(?P<mod_slug>.+)/wiki/(?P<slug>[a-zA-Z0-9-_\/]+)\.\.(?P<version>[0-9a-f\^]{4,40})$', 'front_wiki.views.detail', name='create_request'),
)
