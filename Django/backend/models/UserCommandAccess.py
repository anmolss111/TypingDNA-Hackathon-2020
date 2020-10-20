# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from backend.models.User import User

class UserCommandAccess(models.Model):

	id = models.AutoField(primary_key=True)
	accessToken = models.CharField(max_length=255, blank=True, null=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
