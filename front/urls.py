"""front URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('front_users.urls', namespace='front_users')),
    url(r'^', include('front_modules.urls', namespace='front_modules')),
    # this packages are of modules, by now is for test 
    url(r'^', include('front_foro.urls', namespace='front_foro')),
    url(r'^(?P<mod_slug>.+)/material/', include('front_material.urls', namespace='front_material')),
    url(r'^', include('front_wiki.urls', namespace='front_wiki')),
    url(r'^', include('front_comments.urls', namespace='front_comments')),
    url(r'^', include('front_activities.urls', namespace='front_activities')),
    url(r'^', include('front_evaluations.urls', namespace='front_evaluations')),
    url(r'^', include('front_gamification.urls', namespace='front_gamification')),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
