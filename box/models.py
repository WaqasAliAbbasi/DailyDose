from django.db import models
from django.conf import settings
from products.models import Product
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

class Box(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name="box", on_delete=models.CASCADE)

    def __str__(self):
        return 'Box #' + str(self.id) + ' - ' + str(self.user)

class BoxItem(models.Model):
    box = models.ForeignKey(Box, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return 'Box #' + str(self.box.id) + ' - ' + str(self.quantity) + ' x ' + str(self.product)

@receiver(post_save, sender=get_user_model())
def create_user_cart(sender, instance, created, **kwargs):
    if created:
        Box.objects.create(user=instance)
