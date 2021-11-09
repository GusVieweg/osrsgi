# from django.contrib import admin
from django.urls import path
from .views import render_suburl

urlpatterns = [
    path("suburl/", render_suburl)
]
