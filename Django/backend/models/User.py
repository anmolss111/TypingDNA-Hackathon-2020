# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class User(models.Model):

	id = models.AutoField(primary_key=True)
	email = models.CharField(max_length=255, blank=True, null=True)
	password = models.CharField(max_length=255, blank=True, null=True)
