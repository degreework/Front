import unittest

def suite():
    return unittest.TestLoader().discover("front_users.test.selenium.python.web_driver", pattern="*.py")



import pkgutil
import unittest

for loader, module_name, is_pkg in pkgutil.walk_packages(__path__):
    module = loader.find_module(module_name).load_module(module_name)
    for name in dir(module):
        obj = getattr(module, name)
        if isinstance(obj, type) and issubclass(obj, unittest.case.TestCase):
            exec ('%s = obj' % obj.__name__)