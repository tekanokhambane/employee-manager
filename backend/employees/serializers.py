from rest_framework import serializers
import datetime
import re
from .models import Employee, Skill


class SkillSerializer(serializers.ModelSerializer):
    """
    A serializer class for the Skill model.

    Attributes:
        name (serializers.CharField): The name of the skill. Required field.
        employee (serializers.PrimaryKeyRelatedField): The related employee for the skill. Required field.
        yrs_exp (serializers.IntegerField): The years of experience for the skill. Optional field.
        seniority (serializers.CharField): The seniority level of the skill. Required field.

    Meta:
        model (Skill): The Skill model that the serializer is based on.
        fields (list): The fields to include in the serialized representation.
        read_only_fields (list): The fields that are read-only and cannot be modified.

    """

    # all fields are required to create and update a skill
    name = serializers.CharField(required=True)
    employee = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), required=True
    )
    yrs_exp = serializers.IntegerField(required=True)
    seniority = serializers.CharField(required=True)

    class Meta:
        model = Skill
        fields = [
            "id",
            "name",
            "yrs_exp",
            "seniority",
            "employee",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class EmployeeSerializer(serializers.ModelSerializer):
    """
    A serializer class for the Employee model.

    Attributes:
        skills (SkillSerializer): The serializer for the related skills of the employee. Read-only field.
        first_name (serializers.CharField): The first name of the employee. Required field.
        last_name (serializers.CharField): The last name of the employee. Required field.
        email (serializers.EmailField): The email address of the employee. Required field.
        date_of_birth (serializers.DateField): The date of birth of the employee. Required field.
        contact_number (serializers.CharField): The contact number of the employee. Required field.
        street_address (serializers.CharField): The street address of the employee. Required field.
        city (serializers.CharField): The city of residence of the employee. Required field.
        postcode (serializers.CharField): The postcode of the employee's city. Required field.
        country (serializers.CharField): The country of residence of the employee. Required field.

    Methods:
        validate_email(value): Validates the email field to ensure it is unique and belongs to the current user (if updating).
        validate_postcode(value): Validates the postcode field to ensure it has 4 characters.
        validate_contact_number(value): Validates the contact number field to ensure it has a valid phone number format.
        validate_date_of_birth(value): Validates the date of birth field to ensure it is not in the future.

    Meta:
        model (Employee): The Employee model that the serializer is based on.
        fields (list): The fields to include in the serialized representation.
        read_only_fields (list): The fields that are read-only and cannot be modified.

    """

    # all fields are required to create and update an employee
    skills = SkillSerializer(many=True, read_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    date_of_birth = serializers.DateField(required=True)
    contact_number = serializers.CharField(required=True)
    street_address = serializers.CharField(required=True)
    city = serializers.CharField(required=True)
    postcode = serializers.CharField(required=True)
    country = serializers.CharField(required=True)

    def validate_email(self, value):
        # Check if the email exists
        existing_user = Employee.objects.filter(email=value).first()

        # If it's a new user creation, just check if the email exists
        if self.instance is None:
            if existing_user:
                raise serializers.ValidationError("Email already exists")
        else:
            # If it's an update, check if the email belongs to the current user
            if existing_user and existing_user.id != self.instance.id:
                raise serializers.ValidationError(
                    "Email already exists and belongs to another user"
                )
        return value

    def validate_postcode(self, value):
        if len(value) != 4:
            raise serializers.ValidationError("Postcode must be 4 characters")
        return value

    def validate_contact_number(self, value):
        # create a regex pattern that matches the phone number format (e.g. 123-456-7890, and 1234567890) and if the value are numbers only
        pattern = r"^\d{3}-?\d{3}-?\d{4}$|^\d{10}$"
        if not re.match(pattern, value):
            raise serializers.ValidationError("Invalid phone number format")
        return value

    def validate_date_of_birth(self, value):
        if value > datetime.date.today():
            raise serializers.ValidationError("Date of birth cannot be in the future")
        return value

    class Meta:
        model = Employee
        fields = [
            "id",
            "first_name",
            "last_name",
            "skills",
            "email",
            "date_of_birth",
            "skills",
            "contact_number",
            "street_address",
            "city",
            "postcode",
            "country",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]
