from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import EmployeeListView, SkillViewSet, check_email_exist

router = DefaultRouter()
router.register("skills", SkillViewSet)
router.register("employees", EmployeeListView, basename="employees")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/check-email/<str:email>/", check_email_exist),
]
