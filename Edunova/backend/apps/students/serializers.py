from rest_framework import serializers
from django.utils import timezone
from datetime import date
from django.db import transaction
from .models import Student, Guardian, StudentGuardianMapping

class GuardianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guardian
        fields = ('id', 'first_name', 'last_name', 'email', 'phone_number', 'occupation')

class StudentSerializer(serializers.ModelSerializer):
    guardians = GuardianSerializer(many=True, required=False)
    relationship_type = serializers.CharField(write_only=True, required=False, default='Father')

    class Meta:
        model = Student
        fields = ('id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'admission_no', 'status', 'guardians', 'relationship_type')
        read_only_fields = ('id', 'status')

    def validate_date_of_birth(self, value):
        # Rule VR-SM-001: Minimum age for admission is 3 years, DOB must be in the past
        today = date.today()
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        
        if value >= today:
            raise serializers.ValidationError("Date of Birth must be in the past.")
        if age < 3:
            raise serializers.ValidationError("Minimum age for student admission is 3 years.")
        return value

    def create(self, validated_data):
        guardians_data = validated_data.pop('guardians', [])
        relationship_type = validated_data.pop('relationship_type', 'Father')

        # Rule BR-SM-001: A student profile must link to at least one valid parent profile
        if not guardians_data:
            raise serializers.ValidationError("A student must be registered with at least one guardian profile.")

        with transaction.atomic():
            # Create Student record
            student = Student.objects.create(**validated_data)

            # Create or link Guardian records
            for guardian_data in guardians_data:
                email = guardian_data.get('email')
                # If guardian already exists, reuse it, otherwise create new
                guardian, created = Guardian.objects.get_or_create(
                    email=email,
                    defaults=guardian_data
                )
                
                # Link student to guardian
                StudentGuardianMapping.objects.create(
                    student=student,
                    guardian=guardian,
                    relationship_type=relationship_type
                )
            
            return student


from .models import Parent, StudentDocument, StudentEnrollment, AlumniRegistry, MedicalRecord


class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'


class StudentDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDocument
        fields = '__all__'


class StudentEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentEnrollment
        fields = '__all__'


class AlumniRegistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniRegistry
        fields = '__all__'


class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = '__all__'
