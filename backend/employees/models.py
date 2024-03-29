import random
from django.db import models


class Employee(models.Model):
    """
    A class representing an Employee.
    Methods:
        generate_id(): Generates a unique identifier for the employee.
        save(*args, **kwargs): Overrides the save method to generate and assign a unique identifier to the employee if it doesn't already have one.
        We are using a custom id that is generated by concatenating two random letters and two random numbers.
        __str__(): Returns a string representation of the employee.

    """

    id = models.CharField(max_length=100, primary_key=True, editable=False, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    date_of_birth = models.DateField()
    contact_number = models.CharField(max_length=100, blank=True, null=True)
    street_address = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    postcode = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def generate_id(self):
        """
        Generates a unique identifier for the employee.

        Returns:
            str: A string representing the unique identifier for the employee.

        Example:
            >>> employee = Employee()
            >>> employee.generate_id()
            'AB1234'
        """
        # the id is composed of two random letters and two random numbers
        letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        numbers = "0123456789"
        id = "".join(random.choice(letters) for i in range(2)) + "".join(
            random.choice(numbers) for i in range(4)
        )
        return id

    def save(self, *args, **kwargs):
        if not self.id:
            generated_id = self.generate_id()
            while Employee.objects.filter(id=generated_id).exists():
                generated_id = self.generate_id()
            self.id = generated_id
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Skill(models.Model):
    """
    A class representing a Skill.

    Attributes:
        name (str): The name of the skill.
        employee (Employee): The employee associated with the skill.
        yrs_exp (int): The number of years of experience in the skill.
        seniority (str): The seniority level of the skill.
        created_at (datetime): The date and time when the skill was created.
        updated_at (datetime): The date and time when the skill was last updated.

    Meta:
        ordering (list): The default ordering of skills based on the name.
        unique_together (tuple): A tuple specifying that the combination of name and employee should be unique.

    Methods:
        __str__(): Returns a string representation of the skill.

    """

    name = models.CharField(max_length=100)
    employee = models.ForeignKey(
        "Employee", on_delete=models.CASCADE, related_name="skills"
    )
    yrs_exp = models.IntegerField()
    seniority = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        unique_together = ("name", "employee")

    def __str__(self):
        return self.name
