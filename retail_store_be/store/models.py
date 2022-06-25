from django.db import models


# Create your models here.
class Store(models.Model):
    sku = models.CharField(max_length=255, blank=True, null=True)
    productName = models.CharField(max_length=70)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)