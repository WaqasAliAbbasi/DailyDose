from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import Quiz
from .serializers import QuizSerializer

class QuizViewSet(viewsets.ViewSet):
    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def list(self, request):
        quiz = Quiz.objects.all().first()
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

class QuizAttemptViewSet(viewsets.ViewSet):
    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def create(self, request):
        return Response()
