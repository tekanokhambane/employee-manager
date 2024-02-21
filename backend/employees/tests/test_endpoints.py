from rest_framework.test import APITestCase
from rest_framework import status
from datetime import date
from employees.models import Employee, Skill
from employees.serializers import EmployeeSerializer, SkillSerializer


class EmployeeAPITestCase(APITestCase):
    def setUp(self):

        self.employee_data = {
            "first_name": "John",
            "last_name": "Doe",
            "contact_number": "1234567890",
            "street_address": "123 Main Street",
            "city": "New York",
            "postcode": "1234",
            "country": "US",
            "email": "john.doe@example.com",
            "date_of_birth": "1990-01-01",
            "skills": [],
        }

    def test_employee_list_empty(self):
        url = "/api/employees/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(response.data, [])

    def test_employee_list(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            contact_number="1234567890",
            street_address="123 Main Street",
            city="New York",
            postcode="1234",
            country="US",
            email="john.doe@example.com",
            date_of_birth="1990-01-01",
        )
        Skill.objects.create(
            name="Skill 1", yrs_exp=2, seniority="Senior", employee=employee
        )
        Skill.objects.create(
            name="Skill 2", yrs_exp=1, seniority="Mid", employee=employee
        )

        url = "/api/employees/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], employee.id)
        self.assertEqual(response.data[0]["first_name"], employee.first_name)
        self.assertEqual(response.data[0]["last_name"], employee.last_name)
        self.assertEqual(response.data[0]["contact_number"], employee.contact_number)
        self.assertEqual(response.data[0]["street_address"], employee.street_address)
        self.assertEqual(response.data[0]["city"], employee.city)
        self.assertEqual(response.data[0]["postcode"], employee.postcode)
        self.assertEqual(response.data[0]["country"], employee.country)
        self.assertEqual(response.data[0]["email"], employee.email)
        self.assertEqual(response.data[0]["date_of_birth"], employee.date_of_birth)
        self.assertEqual(len(response.data[0]["skills"]), 2)

    def test_employee_create_valid_data(self):
        url = "/api/employees/"
        response = self.client.post(url, self.employee_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(), 1)
        employee = Employee.objects.first()
        self.assertEqual(employee.first_name, "John")
        self.assertEqual(employee.last_name, "Doe")
        self.assertEqual(employee.email, "john.doe@example.com")
        self.assertEqual(employee.date_of_birth, date(1990, 1, 1))
        self.assertEqual(employee.skills.count(), 0)

    def test_employee_create_invalid_data(self):
        url = "/api/employees/"
        response = self.client.post(url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Employee.objects.count(), 0)

    def test_employee_create_missing_data(self):
        url = "/api/employees/"
        response = self.client.post(url, {"first_name": "John"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Employee.objects.count(), 0)

    def test_employee_retrieve(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            contact_number="1234567890",
            street_address="123 Main Street",
            city="New York",
            postcode="1234",
            country="US",
            email="john.doe@example.com",
            date_of_birth="1990-01-01",
        )
        Skill.objects.create(
            name="Skill 1", yrs_exp=2, seniority="Senior", employee=employee
        )
        Skill.objects.create(
            name="Skill 2", yrs_exp=1, seniority="Mid", employee=employee
        )
        url = f"/api/employees/{employee.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], employee.id)
        self.assertEqual(response.data["first_name"], employee.first_name)
        self.assertEqual(response.data["last_name"], employee.last_name)
        self.assertEqual(response.data["email"], employee.email)
        self.assertEqual(response.data["date_of_birth"], employee.date_of_birth)
        self.assertEqual(len(response.data["skills"]), 2)

    def test_employee_update(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            contact_number="1234567890",
            street_address="123 Main Street",
            city="New York",
            postcode="1234",
            country="US",
            email="john.doe@example.com",
            date_of_birth="1990-01-01",
        )

        url = f"/api/employees/{employee.id}/"
        response = self.client.put(
            url,
            {
                "first_name": "Jane",
                "last_name": "Doe",
                "email": "jane.doe@example.com",
                "contact_number": "1234567890",
                "street_address": "123 Main Street",
                "city": "New York",
                "postcode": "1234",
                "country": "US",
                "date_of_birth": "1990-01-01",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Employee.objects.count(), 1)
        employee.refresh_from_db()
        self.assertEqual(employee.first_name, "Jane")

    def test_employee_update_missing_data(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            date_of_birth="1990-01-01",
        )

        url = f"/api/employees/{employee.id}/"
        response = self.client.put(url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Employee.objects.count(), 1)
        employee.refresh_from_db()
        self.assertEqual(employee.first_name, "John")

    def test_employee_delete(self):
        employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            date_of_birth="1990-01-01",
        )

        url = f"/api/employees/{employee.id}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Employee.objects.count(), 0)

    def test_employee_create_with_invalid_postcode(self):
        url = "/api/employees/"
        response = self.client.post(
            url,
            {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "contact_number": "1234567890",
                "street_address": "123 Main Street",
                "city": "New York",
                "postcode": "123",
                "country": "US",
                "date_of_birth": "1990-01-01",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Employee.objects.count(), 0)

    def test_employee_create_with_invalid_email(self):
        url = "/api/employees/"
        response = self.client.post(
            url,
            {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doeexample.com",
                "contact_number": "1234567890",
                "street_address": "123 Main Street",
                "city": "New York",
                "postcode": "1234",
                "country": "US",
                "date_of_birth": "1990-01-01",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Employee.objects.count(), 0)

    def test_employee_create_with_invalid_date_of_birth(self):
        url = "/api/employees/"
        response = self.client.post(
            url,
            {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "contact_number": "1234567890",
                "street_address": "123 Main Street",
                "city": "New York",
                "postcode": "1234",
                "country": "US",
                "date_of_birth": "2030-01-01",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Employee.objects.count(), 0)

    def test_employee_create_with_invalid_contact_number(self):
        url = "/api/employees/"
        response = self.client.post(
            url,
            {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "contact_number": "12345678901",
                "street_address": "123 Main Street",
                "city": "New York",
                "postcode": "1234",
                "country": "US",
                "date_of_birth": "1990-01-01",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Employee.objects.count(), 0)

    def test_employee_create_with_existing_email(self):
        Employee.objects.create(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            date_of_birth="1990-01-01",
        )
        url = "/api/employees/"
        response = self.client.post(
            url,
            {
                "first_name": "Jane",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "contact_number": "1234567890",
                "street_address": "123 Main Street",
                "city": "New York",
                "postcode": "1234",
                "country": "US",
                "date_of_birth": "1990-01-01",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Employee.objects.count(), 1)


class SkillTestCase(APITestCase):
    def setUp(self):
        self.employee = Employee.objects.create(
            first_name="John",
            last_name="Doe",
            contact_number="1234567890",
            street_address="123 Main Street",
            city="New York",
            postcode="1234",
            country="US",
            email="john.doe@example.com",
            date_of_birth="1990-01-01",
        )
        self.skill1 = Skill.objects.create(
            name="Python", yrs_exp=5, seniority="Senior", employee=self.employee
        )
        self.skill2 = Skill.objects.create(
            name="JavaScript", yrs_exp=3, seniority="Mid", employee=self.employee
        )

    def test_skill_list(self):
        url = "/api/skills/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["name"], self.skill2.name)
        self.assertEqual(response.data[1]["name"], self.skill1.name)
        self.assertEqual(response.data[0]["yrs_exp"], self.skill2.yrs_exp)
        self.assertEqual(response.data[1]["yrs_exp"], self.skill1.yrs_exp)
        self.assertEqual(response.data[0]["seniority"], self.skill2.seniority)
        self.assertEqual(response.data[1]["seniority"], self.skill1.seniority)
        self.assertEqual(response.data[0]["employee"], self.skill2.employee.id)
        self.assertEqual(response.data[1]["employee"], self.skill1.employee.id)

    def test_skill_retrieve(self):
        url = f"/api/skills/{self.skill1.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.skill1.name)
        self.assertEqual(response.data["yrs_exp"], self.skill1.yrs_exp)
        self.assertEqual(response.data["seniority"], self.skill1.seniority)
        self.assertEqual(response.data["employee"], self.skill1.employee.id)

    def test_skill_create(self):
        url = "/api/skills/"

        response = self.client.post(
            url,
            {
                "name": "Ruby",
                "yrs_exp": 3,
                "seniority": "Mid",
                "employee": self.employee.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Skill.objects.count(), 3)
        self.assertEqual(Skill.objects.last().name, "Ruby")
        self.assertEqual(Skill.objects.last().yrs_exp, 3)
        self.assertEqual(Skill.objects.last().seniority, "Mid")
        self.assertEqual(Skill.objects.last().employee, self.employee)

    def test_skill_update(self):
        url = f"/api/skills/{self.skill1.id}/"
        response = self.client.put(
            url,
            {
                "name": "Ruby",
                "yrs_exp": 3,
                "seniority": "Mid",
                "employee": self.employee.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Skill.objects.count(), 2)
        self.assertEqual(Skill.objects.last().name, "Ruby")
        self.assertEqual(Skill.objects.last().yrs_exp, 3)
