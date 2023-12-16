from django.urls import path, include
from . import views

urlpatterns = [
    path('questions/', views.QuestionList.as_view()),
    path('question/<int:pk>', views.QuestionDetail.as_view()),
    path('question/add', views.QuestionAddNew.as_view()),
    path('question/delete/<int:pk>', views.QuestionDelete.as_view()),
    path('question/update/<int:pk>', views.QuestionUpdate.as_view()),
    path('answers/', views.AnswerList.as_view()),
    path('answer/add', views.AnswerAddNew.as_view()),
    path('questionsByUser/<int:pk>', views.GetQuestionByUserId.as_view()),
]
