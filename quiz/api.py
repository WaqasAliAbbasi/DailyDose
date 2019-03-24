from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Quiz
from .serializers import QuizSerializer, LeanQuizSerializer

class QuizViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Quiz.objects.all()
        serializer = LeanQuizSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Quiz.objects.all()
        quiz = get_object_or_404(queryset, pk=pk)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)
