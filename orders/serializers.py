from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = OrderItem
        fields = ('product','quantity')

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    status = serializers.SerializerMethodField()

    def get_status(self,obj):
        return obj.get_status_display()

    class Meta:
        model = Order
        fields = ('id', 'for_month', 'order_items', 'status')

    def create(self, validated_data):
        user = self.context['request'].user

        products_qty = {}
        for box_item in user.box_items.all():
            product = box_item.product
            if product not in products_qty:
                products_qty[product] = 0
            products_qty[product] += 1

        order = Order.objects.create(**validated_data)
        for product in products_qty:
            OrderItem.objects.create(order=order, product=product, quantity=products_qty[product])

        return order
