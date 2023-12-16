from django.db import models
from authentication.models import MyUser
class Question(models.Model):
    question = models.CharField(max_length=255)
    title = models.TextField()
    subject = models.TextField()
    user = models.ForeignKey(
    MyUser, related_name='questions', on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question





class Answer(models.Model):
    question = models.ForeignKey(
        Question, related_name='answer', on_delete=models.CASCADE)
    answer = models.TextField()
    user = models.ForeignKey(
        MyUser, related_name='answers', on_delete=models.CASCADE , default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.answer
