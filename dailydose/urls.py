"""dailydose URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from rest_framework import routers
from notes.api import NoteViewSet
from products.api import ProductViewSet
from box.api import BoxItemsViewSet
from orders.api import OrderViewSet
from quiz.api import QuizViewSet, QuizAttemptViewSet, RecommendationsViewSet

router = routers.DefaultRouter()
router.register('products', ProductViewSet, 'products')
router.register('notes', NoteViewSet, 'notes')
router.register('box_items', BoxItemsViewSet, 'box_items')
router.register('orders', OrderViewSet, 'orders')
router.register('questionnaire', QuizViewSet, 'quizzes')
router.register('questionnaire_submit', QuizAttemptViewSet, 'quiz_attempts')
router.register('recommendations', RecommendationsViewSet, 'recommendations')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('users.urls')),
    path('api/auth/', include('knox.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('', TemplateView.as_view(template_name="index.html"), name='react-home'),
    url(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html"), name='react-other')
]
