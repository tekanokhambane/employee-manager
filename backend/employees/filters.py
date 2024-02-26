import django_filters
from .models import Employee, Skill


class EmployeeFilter(django_filters.FilterSet):
    """
    A class representing a filter for the Employee model.

    Attributes:
        start_date_of_birth (django_filters.DateFilter): A filter for the start date of birth of employees. It filters the employees whose date of birth is greater than or equal to the specified date.
        end_date_of_birth (django_filters.DateFilter): A filter for the end date of birth of employees. It filters the employees whose date of birth is less than or equal to the specified date.
        skills (django_filters.ModelMultipleChoiceFilter): A filter for the skills of employees. It filters the employees based on the selected skills.
            - field_name (str): The name of the field to filter on, which is "skills__name" in this case.
            - to_field_name (str): The name of the field to use for the filter, which is "name" in this case.
            - queryset (QuerySet): The queryset of skills to choose from, which is Skill.objects.all() in this case.

    Meta:
        model (Employee): The model to filter, which is the Employee model in this case.
        fields (dict): The fields to filter on and the lookup types to use for each field.
            - "first_name": ["icontains"]: A case-insensitive filter for the first name of employees. It filters the employees whose first name contains the specified value.
            - "last_name": ["icontains"]: A case-insensitive filter for the last name of employees. It filters the employees whose last name contains the specified value.
            - "email": ["icontains"]: A case-insensitive filter for the email of employees. It filters the employees whose email contains the specified value.
            - "skills": ["exact"]: An exact filter for the skills of employees. It filters the employees whose skills exactly match the selected skills.
            - "date_of_birth": ["exact"]: An exact filter for the date of birth of employees. It filters the employees whose date of birth exactly matches the specified date.

    """

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
