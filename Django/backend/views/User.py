# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.apps import apps
from backend.models.User import User
from backend.models.UserAccess import UserAccess
from backend.models.UserCommandGroup import UserCommandGroup
from backend.models.UserCommand import UserCommand
from backend.models.UserCommandAccess import UserCommandAccess

from backend.serializers.User import UserSerializer
from backend.serializers.UserCommandGroup import UserCommandGroupSerializer
from backend.serializers.UserCommand import UserCommandSerializer

import json

import random
import string,time

import hashlib

import urllib.request, base64

def getHashedEmail(email):

    return (hashlib.md5(email.encode()).hexdigest())

def saveTypingPattern(emailHash, tp):

    base_url = 'https://api.typingdna.com'
    id = emailHash
    apiKey = 'ebb7c868b5c35a38274006d521f05812'
    apiSecret = '9b65a24e2ab081f70e52e3cdca677fc4'

    authstring = '%s:%s' % (apiKey, apiSecret)
    base64string = base64.encodestring(authstring.encode()).decode().replace('\n', '')
    data = urllib.parse.urlencode({'tp':tp})
    url = '%s/save/%s' % (base_url, id)

    request = urllib.request.Request(url, data.encode('utf-8'), method='POST')
    request.add_header("Authorization", "Basic %s" % base64string)
    request.add_header("Content-type", "application/x-www-form-urlencoded")

    res = urllib.request.urlopen(request)
    res_body = res.read()
    print(res_body.decode('utf-8'))

def verifyTypingPattern(emailHash, tp):

    base_url = 'https://api.typingdna.com'
    id = emailHash
    apiKey = 'ebb7c868b5c35a38274006d521f05812'
    apiSecret = '9b65a24e2ab081f70e52e3cdca677fc4'
    quality = '2'

    authstring = '%s:%s' % (apiKey, apiSecret)
    base64string = base64.encodestring(authstring.encode()).decode().replace('\n', '')
    data = urllib.parse.urlencode({'tp':tp, 'quality':quality})
    url = '%s/verify/%s' % (base_url, id)

    request = urllib.request.Request(url, data.encode('utf-8'), method='POST')
    request.add_header("Authorization", "Basic %s" % base64string)
    request.add_header("Content-type", "application/x-www-form-urlencoded")

    res = urllib.request.urlopen(request)
    res_body = res.read()
    print(res_body.decode('utf-8'))

def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return (result_str)

@api_view(['POST'])
def login(request, format=None):

	requestBody = json.loads(request.body.decode('utf-8'))

	email = requestBody['email']
	password = requestBody['password']

	user = User.objects.filter(email=email, password=password).first()

	if(user != None):

		userAccess = UserAccess.objects.filter(user=user).first()

		accessToken = get_random_string(32)

		if(userAccess == None):

			userAccess = UserAccess()
			userAccess.accessToken = accessToken
			userAccess.user = user
			userAccess.save()

		else:

			userAccess.accessToken = accessToken
			userAccess.save()

		return Response({

			'status': 'success',
			'accessToken': accessToken
		},status=status.HTTP_200_OK)

	return Response({

        'status': 'error'
    },status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def signup(request, format=None):

    requestBody = json.loads(request.body.decode('utf-8'))

    email = requestBody['email']
    password = requestBody['password']

    exisitingUser = User.objects.filter(email=email).first()

    if(exisitingUser == None):

        user = User()
        user.email = email
        user.password = password
        user.save()

        accessToken = get_random_string(32)

        userAccess = UserAccess()
        userAccess.accessToken = accessToken
        userAccess.user = user
        userAccess.save()

        return Response({

            'status': 'success',
            'accessToken': accessToken
        },status=status.HTTP_200_OK)

    else:

        return Response({

    		'status': 'error'
    	},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def createCommandGroup(request, format=None):

    requestBody = json.loads(request.body.decode('utf-8'))

    accessToken = requestBody['accessToken']

    userAccess = UserAccess.objects.filter(accessToken=accessToken).first()

    if(userAccess != None):

        userCommandGroup = UserCommandGroup()
        userCommandGroup.name = requestBody['commandGroup']
        userCommandGroup.user = userAccess.user
        userCommandGroup.save()

        return Response({

            'status': 'success'
        },status=status.HTTP_200_OK)

    else:

        return Response({

    		'status': 'error'
    	},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def readCommands(request, format=None):

    requestBody = json.loads(request.body.decode('utf-8'))

    accessToken = requestBody['accessToken']

    userAccess = UserAccess.objects.filter(accessToken=accessToken).first()

    if(userAccess != None):

        userCommandGroups = UserCommandGroup.objects.filter(user=userAccess.user)

        responseData = []
        if(userCommandGroups.count() != 0):

            userCommandGroupSerializer = UserCommandGroupSerializer(userCommandGroups, many=True)

            for userCommandGroup in userCommandGroupSerializer.data:

                userCommandGroupQuery = UserCommandGroup.objects.filter(id=userCommandGroup['id']).first()
                userCommand = UserCommand.objects.filter(userCommandGroup=userCommandGroupQuery)

                userCommandSerializer = UserCommandSerializer(userCommand, many=True)

                responseData.append({

                    'groupData': userCommandGroup,
                    'commands': userCommandSerializer.data
                })

        return Response({

            'status': 'success',
            'data': responseData
        },status=status.HTTP_200_OK)

    else:

        return Response({

    		'status': 'error'
    	},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def createCommand(request, format=None):

    requestBody = json.loads(request.body.decode('utf-8'))

    accessToken = requestBody['accessToken']

    userAccess = UserAccess.objects.filter(accessToken=accessToken).first()

    if(userAccess != None):

        userCommandGroupQuery = UserCommandGroup.objects.filter(id=requestBody['commandGroup']).first()

        userCommand = UserCommand()
        userCommand.name = requestBody['command']
        userCommand.userCommandGroup = userCommandGroupQuery
        userCommand.save()

        saveTypingPattern(getHashedEmail(userAccess.user.email), requestBody['tp'])

        return Response({

            'status': 'success'
        },status=status.HTTP_200_OK)

    else:

        return Response({

    		'status': 'error'
    	},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def verifyCommand(request, format=None):

    requestBody = json.loads(request.body.decode('utf-8'))

    accessToken = requestBody['accessToken']

    userAccess = UserAccess.objects.filter(accessToken=accessToken).first()

    if(userAccess != None):

        # verifyTypingPattern(getHashedEmail(userAccess.user.email), requestBody['tp'])

        # userCommand = UserCommand()
        # userCommand.name = requestBody['command']
        # userCommand.userCommandGroup = userCommandGroupQuery
        # userCommand.save()

        return Response({

            'status': 'success'
        },status=status.HTTP_200_OK)

    else:

        return Response({

    		'status': 'error'
    	},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def runCommand(request, format=None):

    requestBody = json.loads(request.body.decode('utf-8'))

    accessToken = requestBody['accessToken']

    userAccess = UserAccess.objects.filter(accessToken=accessToken).first()

    if(userAccess != None):

        accessTokenCommand = get_random_string(32)

        userCommandAccess = UserCommandAccess()
        userCommandAccess.accessToken = accessTokenCommand
        userCommandAccess.user = userAccess.user
        userCommandAccess.save()

        # verifyTypingPattern(getHashedEmail(userAccess.user.email), requestBody['tp'])

        # userCommand = UserCommand()
        # userCommand.name = requestBody['command']
        # userCommand.userCommandGroup = userCommandGroupQuery
        # userCommand.save()

        return Response({

            'status': 'success',
            'accessTokenCommand': accessTokenCommand
        },status=status.HTTP_200_OK)

    else:

        return Response({

    		'status': 'error'
    	},status=status.HTTP_403_FORBIDDEN)
