from django.db import models
from django.conf import settings
from products.models import Product

class Order(models.Model):
    QUEUED_FOR_PROCESSING = 1
    PROCESSING = 2
    DISPATCHED = 3
    DELIVERED = 4
    CANCELLED = 5
    status = models.IntegerField(choices=((QUEUED_FOR_PROCESSING ,'Queued for Processing'), (PROCESSING,'Processing'), (DISPATCHED,'Dispatched'), (DELIVERED,'Delivered'), (CANCELLED, 'Cancelled')), default=1)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="orders", on_delete=models.CASCADE)
    for_month = models.DateField()

    time_placed = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'for_month',)

    def __str__(self):
        return 'Order #' + str(self.id) + ' - ' + self.time_placed.strftime("%c")


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return 'Order #' + str(self.order.id) + ' - ' + str(self.quantity) + ' x ' + str(self.product)
