import logging
from celery import shared_task
from django.utils import timezone
from .models import AttendanceRecord

logger = logging.getLogger('notifications')

@shared_task
def dispatch_absentee_alert(attendance_record_id):
    """
    Asynchronously logs the dispatch of absentee alerts to guardians.
    In production, this hooks up to the Twilio / Msg91 / WhatsApp routing systems.
    Runs in background via Celery worker within the 15-minute SLA limit (BR-AT-002).
    """
    try:
        record = AttendanceRecord.objects.get(id=attendance_record_id, deleted_at__isnull=True)
        if record.status != 'Absent':
            logger.info(f"Attendance record {attendance_record_id} status is '{record.status}'. No alert needed.")
            return

        student = record.student
        guardians = student.guardians.all()

        if not guardians:
            logger.warning(f"No guardians found linked to student {student.id}. Alert dispatch failed.")
            return

        for guardian in guardians:
            guardian_name = f"{guardian.first_name} {guardian.last_name}"
            phone = guardian.phone_number
            email = guardian.email

            # Formulate template notification message (NT-002)
            message = (
                f"Alert: {student.first_name} {student.last_name} was marked absent for "
                f"class on {record.date}. Please contact the administration for details."
            )

            # Mock SMS / WhatsApp transmission logs
            logger.info(
                f"[ALERT DISPATCHED] Channel=SMS/WhatsApp, Recipient='{guardian_name}', "
                f"Phone='{phone}', Timestamp='{timezone.now().isoformat()}'"
            )
            logger.info(f"Message Body: \"{message}\"")

    except AttendanceRecord.DoesNotExist:
        logger.error(f"AttendanceRecord {attendance_record_id} does not exist or was deleted.")
    except Exception as e:
        logger.error(f"Failed to dispatch absentee alerts: {str(e)}")
        raise e
