"""rest_api URL Configuration

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
from django.conf.urls import include, url, patterns
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from rest_framework import routers
from sc1 import views

prefix = ''

router = routers.SimpleRouter()
router.register(r'clubs', views.ClubViewSet)

urlpatterns = patterns(prefix,
                       url(r'^sc1/', include(router.urls)),

                       url(r'^sc1/login/(?P<club>[0-9]+)/$', views.LoginView.as_view()),
                       url(r'^sc1/logout/(?P<club>[0-9]+)/$', views.LogoutView.as_view(),),

                       url(r'^sc1/users/(?P<club>[0-9]+)/$', views.ClubUserViewSet.as_view({'post': 'create'})),
                       url(r'^sc1/users/(?P<club>[0-9]+)/(?P<pk>[0-9]+)/$',
                           views.ClubUserViewSet.as_view({'get': 'retrieve', 'post': 'update'})),

                       url(r'^sc1/admin/', include(admin.site.urls)),

                       )

if settings.DEBUG:
    urlpatterns += patterns(prefix,
                            url(r'^sc1/restful_docs/', include('rest_framework_swagger.urls')),

                            # to route uploaded files
                            # DEPLOY: in prod web server must route uploaded files
                            ) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
