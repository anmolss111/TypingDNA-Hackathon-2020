from rest_framework import serializers
from backend.models.UserAccess import UserAccess

class UserAccessSerializer(serializers.ModelSerializer):

	class Meta:

		model = UserAccess
		fields = (

			'id',
			'accessToken',
			'user'
		)
