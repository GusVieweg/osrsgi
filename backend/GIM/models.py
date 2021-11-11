from django.conf import settings
from django.db import models

# Create your models here.
class Want(models.Model):
    wanter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item_id = models.IntegerField(null=False)
    quantity = models.IntegerField(null=False)
    complete = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Have(models.Model):
    haver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item_id = models.IntegerField(null=False)
    quantity = models.IntegerField(null=False)
    complete = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Transaction(models.Model):
    want = models.ForeignKey(Want, on_delete=models.CASCADE)
    have = models.ForeignKey(Have, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False)
    confirmed = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
