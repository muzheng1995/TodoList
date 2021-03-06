from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from todoList.models import TodoItem
from todoList.serializers import TodoSerializer
from datetime import datetime, timedelta


class TodoListView(APIView):
    def get(self, request):
        results = TodoItem.objects.all()
        serializer = TodoSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodayTodosView(APIView):
    def get(self, request):
        results = TodoItem.objects.filter(expireDate=datetime.now().date())
        serializer = TodoSerializer(results, many=True)
        return Response(serializer.data)


class NextSevenDaysTodosView(APIView):
    def get(self, request):
        today = datetime.now().date()
        results = TodoItem.objects.filter(expireDate__range=(today, today+timedelta(days=6)))
        serializer = TodoSerializer(results, many=True)
        return Response(serializer.data)


class TodoView(APIView):
    def get(self, request, id):
        try:
            result = TodoItem.objects.get(id=id)
        except TodoItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TodoSerializer(result)
        return Response(serializer.data)

    def put(self, request, id):
        try:
            result = TodoItem.objects.get(id=id)
        except TodoItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TodoSerializer(result, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            result = TodoItem.objects.get(id=id)
        except TodoItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # serializer = TodoSerializer(result)
        result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
