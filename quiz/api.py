from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from .models import Quiz, QuizAttempt, Question, Choice, Response as QuizResponse
from .serializers import QuizSerializer

class QuizViewSet(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def list(self, request):
        quiz = Quiz.objects.all().first()
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

class QuizAttemptViewSet(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request):
        if "id" not in request.data or "responses" not in request.data:
            return Response("Invalid request body", status=status.HTTP_400_BAD_REQUEST)

        quiz_id = request.data["id"]
        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response("Object does not exist", status=status.HTTP_400_BAD_REQUEST)

        responses = request.data["responses"]
        fetched_responses = {}
        for question in quiz.questions.all():
            if str(question.id) not in responses:
                return Response("All questions must be answered", status=status.HTTP_400_BAD_REQUEST)
            try:
                fetched_responses[question] = Choice.objects.get(id=responses[str(question.id)], question=question)
            except Choice.DoesNotExist:
                return Response("Invalid choice selected", status=status.HTTP_400_BAD_REQUEST)

        quiz_attempt = QuizAttempt.objects.create(user=request.user,quiz=quiz)
        for question in fetched_responses:
            QuizResponse.objects.create(quiz_attempt=quiz_attempt, question=question, choice=fetched_responses[question])

        return Response('Responses have been successfully recorded')
