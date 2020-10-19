# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from backend.models.UserCommandGroup import UserCommandGroup

class UserCommand(models.Model):

	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=255, blank=True, null=True)
	userCommandGroup = models.ForeignKey(UserCommandGroup, on_delete=models.CASCADE, blank=True, null=True)
