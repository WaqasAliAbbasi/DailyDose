from rest_framework import generics, permissions, viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import BoxItemSerializer

class BoxItemsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = BoxItemSerializer

    def get_queryset(self):
        return self.request.user.box_items.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
