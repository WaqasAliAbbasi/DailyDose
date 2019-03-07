from django.db import models
from django.conf import settings
from products.models import Product
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

class BoxItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="box_items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return 'User #' + str(self.user.id) + ' - ' + str(self.product)
