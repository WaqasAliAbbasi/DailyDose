from rest_framework import serializers
from .models import Quiz, Question, Choice

class ChoiceSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id','content',)

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerialzier(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ('id','content','choices',)

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ('id','title','questions')
