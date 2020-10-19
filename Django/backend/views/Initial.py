# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.apps import apps
from backend.models.User import User

import json

@api_view(['POST'])
def stub(request, format=None):

	user = User()
	user.email = 'test@gmail.com'
	user.password = 'test'
	user.save()

	return Response({

		'status': 'success'
	},status=status.HTTP_200_OK)
