"""gymio_rest_api URL Configuration

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
from rest_framework import routers
from sc1 import views

router = routers.SimpleRouter()
router.register(r'clubs', views.ClubViewSet)

urlpatterns = [
    url(r'^sc1/', include(router.urls)),

    url(r'^sc1/users/(?P<club>[0-9]+)/$', views.ClubUserViewSet.as_view({'post': 'create'})),
    url(r'^sc1/users/(?P<club>[0-9]+)/(?P<pk>[0-9]+)/$', views.ClubUserViewSet.as_view({'get': 'retrieve'})),

    url(r'^sc1/admin/', include(admin.site.urls)),
    url(r'^sc1/restful_docs/', include('rest_framework_swagger.urls')),  # TBD: remove in production?
]
