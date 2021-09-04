from django.http import HttpResponseRedirect
from django.urls import reverse

def login(req, user):
    req.session['loggedin'] = True
    req.session['user_id'] = user.id

def if_loggedin(redirect_url): 
    def outer(func):
        def inner(req, *args, **kwargs):
            try:
                if req.session['loggedin'] == True:
                    return HttpResponseRedirect(reverse(redirect_url))
            except:
                return func(req, *args, **kwargs)
        return inner
    return outer



