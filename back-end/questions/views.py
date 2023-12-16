from rest_framework import viewsets
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from django.http import JsonResponse
from rest_framework import status


class QuestionList(ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        return Question.objects.all()


class QuestionUpdate(APIView):
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            return None

    # def put(self, request, **kwargs):
    #     question_id = self.kwargs['pk']
    #     question = self.get_object(question_id)
    #     if question is None:
    #         return JsonResponse({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)
    #     serializer = QuestionSerializer(question, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse({'status': 'updated'}, status=status.HTTP_200_OK)
    #     return JsonResponse({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class QuestionDetail(APIView):
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            return None

    def get(self, request, **kwargs):
        question_id = self.kwargs['pk']
        question = self.get_object(question_id)
        if question is None:
            return JsonResponse({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = QuestionSerializer(question)
        return JsonResponse({'data': serializer.data})


class QuestionDelete(APIView):
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def delete(self, request, pk):
        try:
            question = Question.objects.get(pk=pk)
            question.delete()
            return JsonResponse({'status': 'deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Question.DoesNotExist:
            return JsonResponse({'error': 'Question does not exist'}, status=status.HTTP_404_NOT_FOUND)


class GetQuestionByUserId(APIView):
    permission_classes = [AllowAny]

    def get(self, request, **kwargs):
        question_id = self.kwargs['pk']
        questions = Question.objects.filter(question_id=question_id)
        serializer = QuestionSerializer(questions, many=True)
        data = {'questions': serializer.data,
                'status': 'userquestions', 'status': status.HTTP_200_OK}
        return JsonResponse(data)


class QuestionAddNew(APIView):
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.save()
            data = {'status': 'added','codestatus': status.HTTP_201_CREATED,}
            return JsonResponse(data)
        else:
            data = {'status': 'failed', 'errors': serializer.errors,'status': status.HTTP_400_BAD_REQUEST}
            return JsonResponse(data)


#
#
#
#
#
#
#
#


class AnswerList(ListAPIView):
    serializer_class = AnswerSerializer

    def get_queryset(self):
        return Answer.objects.all()


class AnswerAddNew(APIView):
    serializer_class = AnswerSerializer
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            answer = serializer.save()
            data = {'status': 'answeradded',
                    'codestatus': status.HTTP_201_CREATED,
                    }
            return JsonResponse(data)
        else:
            data = {'status': 'failed', 'errors': serializer.errors,
                    'status': status.HTTP_400_BAD_REQUEST}
            return JsonResponse(data)
