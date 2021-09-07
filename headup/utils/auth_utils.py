from django.http import HttpResponseRedirect
from django.urls import reverse

def login(req, user):
    req.session['is_loggedin'] = True
    try:
        req.session['user_id'] = user.id
    except:
        pass

    

def if_loggedin(redirect_url): 
    def outer(func):
        def inner(req, *args, **kwargs):
            try:
                if req.session['is_loggedin'] == True:
                    return HttpResponseRedirect(reverse(redirect_url))
            except:
                return func(req, *args, **kwargs)
        return inner
    return outer


def login_ok(redirect_url): 
    def outer(func):
        def inner(req, *args, **kwargs):
            try:
                if req.session['is_loggedin'] == True:
                    return func(req, *args, **kwargs)
            except:
                return HttpResponseRedirect(reverse(redirect_url))
        return inner
    return outer
