# from django.contrib import admin
from django.urls import path
from .views import render_suburl, item_lookup

urlpatterns = [
    path("suburl/", render_suburl),
    path("item-lookup/", item_lookup)
]
