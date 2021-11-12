# from django.contrib import admin
from django.urls import path
from .views import render_suburl, item_lookup, add, get, update, remove, transact

urlpatterns = [
    path("suburl/", render_suburl),
    path("item-lookup/", item_lookup),
    path("add/<str:type>/", add),
    path("get/<str:username>/", get),
    path("update/<str:type>/", update),
    path("remove/<str:type>/", remove),
    path("transact/<str:type>/", transact)
]
