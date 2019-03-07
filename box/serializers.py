from rest_framework import serializers
from .models import BoxItem
from products.serializers import ProductSerializer
from products.models import Product

class BoxItemProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name')

class BoxItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = BoxItem
        fields = ('id', 'product', 'product_id')

    def create(self, validated_data):
        validated_data['product'] = validated_data.pop('product_id')
        box_item = BoxItem.objects.create(**validated_data)
        return box_item

    def update(self, instance, validated_data):
        instance.product = validated_data.get('product_id', instance.product)
        return instance
