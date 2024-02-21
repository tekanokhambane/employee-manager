from rest_framework import serializers
import datetime
import re
from .models import Employee, Skill


class SkillSerializer(serializers.ModelSerializer):
    # all fields are required to create and update a skill
    name = serializers.CharField(required=True)
    employee = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), required=True
    )
    yrs_exp = serializers.IntegerField(required=False)
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
