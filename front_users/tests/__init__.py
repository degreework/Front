import unittest

def suite():
    return unittest.TestLoader().discover("front_users.tests.selenium.python.web_driver", pattern="*.py")
