from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from .models import Quiz, QuizAttempt, Question, Choice, Response as QuizResponse
from .serializers import QuizSerializer

from products.models import Product
from products.serializers import ProductSerializer

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

class RecommendationsViewSet(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def list(self, request):
        latest_attempt = request.user.quiz_attempts.all().last()
        if not latest_attempt:
            return Response([])

        products = {}
        for response in latest_attempt.responses.all():
            for weight in response.choice.weights.all():
                if weight.product not in products:
                    products[weight.product] = 0
                products[weight.product] += weight.weight

        sorted_products = sorted(products.items(), key=lambda x: x[1], reverse=True)
        top_five = [i[0] for i in sorted_products[:5]]
        serializer = ProductSerializer(top_five, many=True)
        return Response(serializer.data)
