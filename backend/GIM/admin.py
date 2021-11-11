from django.contrib import admin
from .models import Want, Have, Transaction

# Register your models here.
admin.site.register(Want)
admin.site.register(Have)
admin.site.register(Transaction)