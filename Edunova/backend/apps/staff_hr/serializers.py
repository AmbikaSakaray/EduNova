from rest_framework import serializers
from .models import Employee, LeaveRequest, Payroll

class EmployeeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'username', 'email', 'job_title', 'joined_date', 'base_salary')

class LeaveRequestSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)

    class Meta:
        model = LeaveRequest
        fields = ('id', 'employee', 'employee_name', 'leave_type', 'start_date', 'end_date', 'status', 'reason')
        read_only_fields = ('id', 'status')

class PayrollSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.username', read_only=True)
    job_title = serializers.CharField(source='employee.job_title', read_only=True)

    class Meta:
        model = Payroll
        fields = ('id', 'employee', 'employee_name', 'job_title', 'month', 'allowances', 'deductions', 'net_salary', 'status')


from .models import TeacherProfile


class TeacherProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = TeacherProfile
        fields = '__all__'
