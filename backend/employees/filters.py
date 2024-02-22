import django_filters
from .models import Employee, Skill


class EmployeeFilter(django_filters.FilterSet):
    start_date_of_birth = django_filters.DateFilter(
        field_name="date_of_birth", lookup_expr="gte"
    )
    end_date_of_birth = django_filters.DateFilter(
        field_name="date_of_birth", lookup_expr="lte"
    )
    # filter by skills, will be a select
    skills = django_filters.ModelMultipleChoiceFilter(
        field_name="skills__name",
        to_field_name="name",
        queryset=Skill.objects.all(),
    )

    class Meta:
        model = Employee
        fields = {
            "first_name": ["icontains"],
            "last_name": ["icontains"],
            "email": ["icontains"],
            "skills": ["exact"],
            "date_of_birth": ["exact"],  # You can specify other lookups if needed
        }
