"""
Reusable generic CRUD view base classes.
Used by the newly generated modules so every database table gets a working
List/Create + Retrieve/Update/Delete REST endpoint without duplicating logic.
"""
from rest_framework import generics, permissions


class SoftDeleteQuerysetMixin:
    """Excludes soft-deleted rows (deleted_at is not null) automatically when the model supports it."""

    def get_queryset(self):
        qs = super().get_queryset()
        model = self.serializer_class.Meta.model
        if hasattr(model, 'deleted_at'):
            qs = qs.filter(deleted_at__isnull=True)
        return qs


class BaseListCreateView(SoftDeleteQuerysetMixin, generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]


class BaseRetrieveUpdateDestroyView(SoftDeleteQuerysetMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        if hasattr(instance, 'soft_delete'):
            instance.soft_delete()
        else:
            instance.delete()
