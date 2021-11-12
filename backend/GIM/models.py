from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Want(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_id = models.IntegerField(null=False)
    quantity = models.IntegerField(null=False)
    icon_url = models.TextField(null=False)
    name = models.CharField(max_length=100, null=False)
    complete = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Have(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_id = models.IntegerField(null=False)
    quantity = models.IntegerField(null=False)
    icon_url = models.TextField(null=False)
    name = models.CharField(max_length=100, null=False)
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
