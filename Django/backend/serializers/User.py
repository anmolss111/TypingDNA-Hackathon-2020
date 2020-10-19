from rest_framework import serializers
from backend.models.User import User

class UserSerializer(serializers.ModelSerializer):

	class Meta:

		model = User
		fields = (

			'id',
			'email',
			'password'
		)
