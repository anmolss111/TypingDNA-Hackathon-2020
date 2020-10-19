from rest_framework import serializers
from backend.models.UserCommandGroup import UserCommandGroup

class UserCommandGroupSerializer(serializers.ModelSerializer):

	class Meta:

		model = UserCommandGroup
		fields = (

			'id',
			'user',
			'name'
		)
