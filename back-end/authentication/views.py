from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.permissions import AllowAny
from django.http import JsonResponse

from .models import MyUser


class UsersList(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return MyUser.objects.all()


class LoginView(APIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        if (authenticate(request, email=email, password=password)):
            is_admin = user.is_admin
            user_id = user.id

        if user:
            token, created = Token.objects.get_or_create(user=user)
            data = {'message': 'connected',
                    'token': token.key, 'is_admin': is_admin ,'user_id' : user_id , 'email' : email}
            return JsonResponse(data)
        else:
            data = {'error': 'Invalid credentials',
                    'status': status.HTTP_401_UNAUTHORIZED}
            return JsonResponse(data)


class SignUpView(APIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return MyUser.objects.filter(pk=self.request.user.pk)
        else:
            return MyUser.objects.none()

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            is_admin = user.is_admin

            token, created = Token.objects.get_or_create(user=user)
            data = {'status': 'success', 'token': token.key,
                    'status': status.HTTP_201_CREATED,
                     'is_admin' : is_admin ,
                     }
            return JsonResponse(data)
        else:
            data = {'status': 'failed', 'errors': serializer.errors,
                    'status': status.HTTP_400_BAD_REQUEST}
            return JsonResponse(data)
