from rest_framework import serializers
from django.db import transaction
from .models import Tenant, Domain

class TenantSerializer(serializers.ModelSerializer):
    domain_name = serializers.CharField(write_only=True)

    class Meta:
        model = Tenant
        fields = ('id', 'company_name', 'subdomain', 'status', 'plan_type', 'schema_name', 'domain_name')
        read_only_fields = ('id', 'schema_name')

    def create(self, validated_data):
        domain_name = validated_data.pop('domain_name')
        subdomain = validated_data.get('subdomain')
        
        # Schema name must be simple lowercase alphanumerics without hyphens for postgres schemas
        schema_name = subdomain.lower().replace('-', '_')
        validated_data['schema_name'] = schema_name

        with transaction.atomic():
            # Create Tenant schema
            tenant = Tenant.objects.create(**validated_data)
            
            # Link Domain
            Domain.objects.create(
                domain=domain_name,
                tenant=tenant,
                is_primary=True
            )
            
            return tenant


from .models import CompanyProfile, Campus, Department


class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = '__all__'


class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
