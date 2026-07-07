from django.db.models import Q
from .models import Timetable

def check_timetable_conflict(teacher, section, day_of_week, period_start, period_end, exclude_id=None):
    """
    Checks for scheduling overlaps:
    1. Teacher overlap: Checks if this teacher is assigned to another class during this time.
    2. Section overlap: Checks if this class/section already has a period assigned during this time.
    """
    # Overlap occurs if time intervals overlap:
    # (StartA < EndB) AND (EndA > StartB)
    time_overlap_query = Q(
        period_start__lt=period_end,
        period_end__gt=period_start
    )

    # Base query for same day
    base_query = Timetable.objects.filter(
        day_of_week=day_of_week,
        deleted_at__isnull=True
    )
    
    if exclude_id:
        base_query = base_query.exclude(id=exclude_id)

    # Rule 1: Check Teacher booking conflicts (BR-TT-001)
    teacher_conflict = base_query.filter(
        time_overlap_query,
        teacher=teacher
    ).exists()
    
    if teacher_conflict:
        return "Teacher Conflict: The assigned teacher is already scheduled for another class during this period."

    # Rule 2: Check Section booking conflicts
    section_conflict = base_query.filter(
        time_overlap_query,
        section=section
    ).exists()

    if section_conflict:
        return "Section Conflict: This class section is already scheduled for another subject during this period."

    return None
