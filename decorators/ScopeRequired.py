from django.core.exceptions import PermissionDenied

class ScopeRequired(object):

    def __init__(self, scope, *args, **kwargs):
        """
        If there are decorator arguments, the function
        to be decorated is not passed to the constructor!
        """
        self.scope = scope

    def __call__(self, f):
        """
        If there are decorator arguments, __call__() is only called
        once, as part of the decoration process! You can only give
        it a single argument, which is the function object.
        """
        def wrapped_f(*args, **kwargs):
            print("wrapped_f")
            print(args[0].session.get_expiry_date())
            print(args[0].session.items())
            user_scope = args[0].session.get('scope', '').split(" ")
            print "Must have:", self.scope
            print "Have", user_scope
            count_scope = 0
            
            for scope in user_scope:
                if scope in self.scope:
                    count_scope += 1

            print("count_scope", count_scope)
            print("user_scope", len(user_scope))
            print("self scope", len(self.scope))
            
            if len(self.scope) == count_scope:
                return f(*args,**kwargs)

            raise PermissionDenied

        return wrapped_f