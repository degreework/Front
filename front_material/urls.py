from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns('',
        url(r'^$', views.home, name='home'),
        url(r'^create$', views.create, name='create'),
        url(r'^(?P<id>\d+)$', views.view, name='view'),
)
