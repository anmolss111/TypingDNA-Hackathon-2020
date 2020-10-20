from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns

import backend.views.Initial as InitialView
import backend.views.User as UserView

urlpatterns = {

	url(r'^initial$', InitialView.stub),
	url(r'^auth/login$', UserView.login),
	url(r'^auth/signup$', UserView.signup),
	url(r'^command/group/create$', UserView.createCommandGroup),
	url(r'^commands/read$', UserView.readCommands),
	url(r'^command/create$', UserView.createCommand),
	url(r'^command/run$', UserView.runCommand),
}

urlpatterns = format_suffix_patterns(urlpatterns)
