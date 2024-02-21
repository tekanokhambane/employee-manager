from django.test import TestCase
from employees.models import Employee, Skill


class EmployeeModelTest(TestCase):

    @classmethod
    def setUpData(cls):
        Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="YQqFP@example.com",
            date_of_birth="2000-01-01",
        )

    def test_str_representation(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="YQqFP@example.com",
            date_of_birth="1990-01-01",
        )
        self.assertEqual(str(employee), "John Doe")

    def test_generate_id(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="YQqFP@example.com",
            date_of_birth="1990-01-01",
        )
        self.assertIsNotNone(employee.id)

    def test_save(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="YQqFP@example.com",
            date_of_birth="1990-01-01",
        )
        employee.save()
        self.assertIsNotNone(employee.id)

    def test_employee_count(self):
        # create 1500 employees
        for i in range(1500):
            employee = Employee.objects.create(
                first_name="John",
                last_name="Doe",
                email="YQqFP@example.com",
                date_of_birth="1990-01-01",
            )
        self.assertEqual(Employee.objects.count(), 1500)

    def test_add_employee_skill_single(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="YQqFP@example.com",
            date_of_birth="1990-01-01",
        )
        skill = Skill.objects.create(
            name="Python", yrs_exp=1, seniority="junior", employee=employee
        )
        self.assertEqual(employee.skills.count(), 1)


class SkillModelTest(TestCase):

    def test_str_representation(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="YQqFP@example.com",
            date_of_birth="1990-01-01",
        )
        skill = Skill.objects.create(
            name="Python", yrs_exp=1, seniority="junior", employee=employee
        )
        self.assertEqual(str(skill), "Python")
        self.assertEqual(skill.employee, employee)

    def test_save(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="YQqFP@example.com",
            date_of_birth="1990-01-01",
        )
        skill = Skill.objects.create(
            name="Python", yrs_exp=1, seniority="junior", employee=employee
        )
        skill.save()
        self.assertIsNotNone(skill.id)

    def test_skill_count(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="YQqFP@example.com",
            date_of_birth="1990-01-01",
        )
        Skill.objects.create(
            name="Python", yrs_exp=1, seniority="junior", employee=employee
        )
        Skill.objects.create(
            name="Java", yrs_exp=2, seniority="senior", employee=employee
        )
        self.assertEqual(Skill.objects.count(), 2)
