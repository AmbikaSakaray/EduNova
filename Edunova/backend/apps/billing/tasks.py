import logging
from celery import shared_task
from django.utils import timezone
from datetime import date
from django.db import transaction
from .models import Invoice

logger = logging.getLogger('billing')

@shared_task
def calculate_late_fees():
    """
    Nightly Celery task (runs at midnight, Rule BR-FE-002) that scans for outstanding
    invoices past their installment due date + grace period, and dynamically updates
    their accumulated late fee balances.
    """
    today = date.today()
    logger.info(f"Starting late fee calculation job for date: {today}")

    # Query unpaid and partially paid invoices
    active_invoices = Invoice.objects.filter(
        status__in=['Unpaid', 'Partially Paid'],
        deleted_at__isnull=True
    ).select_related('installment')

    updated_count = 0

    with transaction.atomic():
        for invoice in active_invoices:
            installment = invoice.installment
            due_date = installment.due_date
            grace_days = installment.grace_period_days
            
            # Check if overdue past grace period
            overdue_limit_date = due_date + timezone.timedelta(days=grace_days)
            if today > overdue_limit_date:
                overdue_days = (today - due_date).days
                
                # Dynamic late fee calculation (e.g. rate per day overdue)
                daily_rate = installment.late_fee_rate_per_day
                new_late_fee = overdue_days * daily_rate
                
                if invoice.late_fee_accumulated != new_late_fee:
                    invoice.late_fee_accumulated = new_late_fee
                    invoice.save(update_fields=['late_fee_accumulated', 'updated_at'])
                    updated_count += 1
                    logger.info(
                        f"Invoice ID {invoice.id} for student {invoice.student.first_name} "
                        f"updated with late fee: {new_late_fee} ({overdue_days} days overdue)"
                    )

    logger.info(f"Late fee calculations completed. Total invoices updated: {updated_count}")
    return updated_count
