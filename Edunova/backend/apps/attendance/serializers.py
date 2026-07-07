from rest_framework import serializers
from .models import AttendanceRecord
from .tasks import dispatch_absentee_alert

class AttendanceRecordSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.first_name', read_only=True)
    section_name = serializers.CharField(source='section.name', read_only=True)

    class Meta:
        model = AttendanceRecord
        fields = ('id', 'student', 'student_name', 'section', 'section_name', 'date', 'status', 'remarks')

    def create(self, validated_data):
        instance = super().create(validated_data)
        
        # Trigger Celery alert if marked absent (Rule BR-AT-002)
        if instance.status == 'Absent':
            # Call celery task asynchronously (.delay())
            dispatch_absentee_alert.delay(instance.id)

        return instance

    def update(self, instance, validated_data):
        old_status = instance.status
        instance = super().update(instance, validated_data)
        
        # If changed to absent, trigger alert
        if instance.status == 'Absent' and old_status != 'Absent':
            dispatch_absentee_alert.delay(instance.id)

        return instance
