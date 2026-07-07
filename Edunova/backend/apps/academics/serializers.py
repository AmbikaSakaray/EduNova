from rest_framework import serializers
from .models import ClassRoom, Section, Subject, Timetable, AcademicProgram, AcademicAllocation, Homework, HomeworkSubmission
from .conflict_resolvers import check_timetable_conflict

class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ('id', 'name', 'code')

class SectionSerializer(serializers.ModelSerializer):
    classroom_name = serializers.CharField(source='classroom.name', read_only=True)

    class Meta:
        model = Section
        fields = ('id', 'classroom', 'classroom_name', 'name', 'room_number')

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'name', 'code')

class TimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timetable
        fields = ('id', 'section', 'subject', 'teacher', 'day_of_week', 'period_start', 'period_end')

    def validate(self, attrs):
        # Retrieve context parameters
        teacher = attrs.get('teacher')
        section = attrs.get('section')
        day_of_week = attrs.get('day_of_week')
        period_start = attrs.get('period_start')
        period_end = attrs.get('period_end')
        
        # In case of update, exclude current record
        exclude_id = self.instance.id if self.instance else None

        if period_start >= period_end:
            raise serializers.ValidationError("Period start time must be before period end time.")

        # Run conflict detector checks
        conflict = check_timetable_conflict(
            teacher=teacher,
            section=section,
            day_of_week=day_of_week,
            period_start=period_start,
            period_end=period_end,
            exclude_id=exclude_id
        )

        if conflict:
            raise serializers.ValidationError(conflict)

        return attrs


class AcademicProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicProgram
        fields = '__all__'


class AcademicAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicAllocation
        fields = '__all__'


class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = '__all__'


class HomeworkSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeworkSubmission
        fields = '__all__'
