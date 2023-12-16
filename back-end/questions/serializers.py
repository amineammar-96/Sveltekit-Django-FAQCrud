from rest_framework import serializers
from .models import Question, Answer
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'question', 'answer', 
                  'user', 'created_at', 'updated_at')

class QuestionSerializer(serializers.ModelSerializer):
    answer = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ('id', 'question', 'title', 'subject',
                   'user', 'answer', 'created_at', 'updated_at')
