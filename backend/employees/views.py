from rest_framework import generics, viewsets
from .models import Employee, Skill
from .serializers import EmployeeSerializer, SkillSerializer
from .filters import EmployeeFilter
from rest_framework.filters import SearchFilter
import django_filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


class EmployeeListView(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, SearchFilter]
    filterset_class = EmployeeFilter
    search_fields = ["first_name", "last_name", "email"]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


# create a view to check if email exist


@api_view(["POST"])
def check_email_exist(request, email):

    if Employee.objects.filter(email=email).exists():
        return Response({"exists": True}, status=status.HTTP_200_OK)
    else:
        return Response({"exists": False}, status=status.HTTP_200_OK)
