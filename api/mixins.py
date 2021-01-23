from django.http import JsonResponse
from rest_framework.exceptions import PermissionDenied

class ProtectedAPIMixin:
    def get_object(self, pk=None):
        if not pk:
            pk = self.kwargs.get("pk")

        if self.action != "list" and self.action != "create":
            result = self.queryset.filter(pk=pk).first()

            if result.user.pk != self.request.user.pk:
                raise PermissionDenied("Access denied")

        return result
