from django.conf.urls import patterns, url


urlpatterns = patterns('',
        url(r'^module1/wiki/$', 'front_wiki.views.wiki', name='wiki'),
        url(r'^module1/wiki/create/$', 'front_wiki.views.create', name='create'),
        url(r'^module1/wiki/edit/$', 'front_wiki.views.edit', name='edit'),
)
