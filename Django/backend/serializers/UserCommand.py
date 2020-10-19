from rest_framework import serializers
from backend.models.UserCommand import UserCommand

class UserCommandSerializer(serializers.ModelSerializer):

	class Meta:

		model = UserCommand
		fields = (

			'id',
			'userCommandGroup',
			'name'
		)
