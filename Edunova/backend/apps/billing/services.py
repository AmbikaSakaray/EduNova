import logging
import uuid

logger = logging.getLogger('billing')

class StripeGatewayService:
    """Mocks Stripe payment intent generation and signature verification callbacks"""
    @staticmethod
    def create_checkout_session(invoice, amount):
        session_id = f"sess_{uuid.uuid4().hex[:16]}"
        checkout_url = f"https://checkout.stripe.com/pay/{session_id}"
        
        logger.info(f"[STRIPE] Created checkout session for Invoice ID {invoice.id}. Amount: {amount}. URL: {checkout_url}")
        
        return {
            "session_id": session_id,
            "checkout_url": checkout_url
        }

    @staticmethod
    def verify_webhook_signature(payload, signature_header):
        # In production, uses stripe.Webhook.construct_event
        logger.info("[STRIPE] Verifying webhook signature...")
        return True


class RazorpayGatewayService:
    """Mocks Razorpay order generation and signature verification callbacks"""
    @staticmethod
    def create_order(invoice, amount):
        order_id = f"order_{uuid.uuid4().hex[:16]}"
        
        logger.info(f"[RAZORPAY] Created order for Invoice ID {invoice.id}. Amount: {amount}. Order ID: {order_id}")
        
        return {
            "order_id": order_id,
            "currency": "INR"
        }

    @staticmethod
    def verify_signature(payment_id, order_id, signature):
        # In production, calls client.utility.verify_payment_signature
        logger.info("[RAZORPAY] Verifying payment signature...")
        return True
