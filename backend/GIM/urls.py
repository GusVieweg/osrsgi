# from django.contrib import admin
from django.urls import path
from .views import render_suburl, item_lookup, add, get, update, remove

urlpatterns = [
    path("suburl/", render_suburl),
    path("item-lookup/", item_lookup),
    path("add/<str:type>/", add),
    path("get/", get),
    path("update/<str:type>/", update),
    path("remove/<str:type>/", remove)
]
