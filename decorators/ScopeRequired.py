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
            scope = args[0].session.get('scope', '').split(" ")
            print "Decorator arguments:", self.scope
            print scope
            count_scope = 0
            
            for s in scope:
                if s in self.scope:
                    count_scope += 1
            
            if len(self.scope) == count_scope:
                return f(*args,**kwargs)

            raise PermissionDenied

        return wrapped_f