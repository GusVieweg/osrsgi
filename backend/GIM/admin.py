from django.contrib import admin
from .models import Want, Have, Transaction


class WantAdmin(admin.ModelAdmin):
    list_display = ("name", "quantity",)


class HaveAdmin(admin.ModelAdmin):
    list_display = ("name", "quantity",)


# Register your models here.
admin.site.register(Want, WantAdmin)
admin.site.register(Have, HaveAdmin)
admin.site.register(Transaction)