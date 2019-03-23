from django.db import models
from django.conf import settings

class Quiz(models.Model):
    title = models.CharField(max_length=60)

    class Meta:
        verbose_name = "Quiz"
        verbose_name_plural = "Quizzes"

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    content = models.CharField(max_length=1000, help_text="Enter the question text that you want displayed",verbose_name='Question')

    def __str__(self):
        return str(self.quiz) + " - " + self.content

class Choice(models.Model):
    question = models.ForeignKey(Question, related_name="choices", on_delete=models.CASCADE)
    content = models.CharField(max_length=1000, help_text="Enter the answer text that you want displayed",verbose_name='Choice')

    def __str__(self):
        return str(self.question) + " - " + self.content

class QuizAttempt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="quiz_attempts", on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.PROTECT)

    def __str__(self):
        return str(self.user) + " - Attempt #" + str(self.id) + " - " + str(self.quiz)

class Response(models.Model):
    quiz_attempt = models.ForeignKey(QuizAttempt, related_name="responses", on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.PROTECT)
    choice = models.ForeignKey(Choice, on_delete=models.PROTECT)

    class Meta:
        unique_together = ('quiz_attempt', 'question',)

    def __str__(self):
        return str(self.quiz_attempt) + " | " + str(self.choice)
