from rest_framework import serializers
from backend.models.UserCommandAccess import UserCommandAccess

class UserCommandAccessSerializer(serializers.ModelSerializer):

	class Meta:

		model = UserCommandAccess
		fields = (

			'id',
			'accessToken',
			'user',
			'command'
		)
