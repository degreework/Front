# -*- coding: utf-8 -*-
from django.test import LiveServerTestCase

from selenium import webdriver

import unittest, time, re


class RegisterTest(LiveServerTestCase):
    #fixtures = ['user-data.json']
    live_server_url = 'http://127.0.0.1:8000'

    @classmethod
    def setUpClass(cls):
        super(RegisterTest, cls).setUpClass()
        cls.selenium = webdriver.Firefox()
        #cls.selenium = webdriver.PhantomJS('/home/rizotas/Documents/degreework/testing/phantomjs-1.9.2-linux-x86_64/bin/phantomjs')

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super(RegisterTest, cls).tearDownClass()

    def test_register_access(self):
        response = self.selenium.get('/')
        self.assertEqual(response.status_code, 200)

    def test_register(self):
        self.selenium.get('%s' % (self.live_server_url))
        self.selenium.find_element_by_id("id_first_name").clear()
        self.selenium.find_element_by_id("id_first_name").send_keys("Elizabeth")
        self.selenium.find_element_by_id("id_last_name").clear()
        self.selenium.find_element_by_id("id_last_name").send_keys("Rodriguez")
        self.selenium.find_element_by_id("id_email").clear()
        self.selenium.find_element_by_id("id_email").send_keys("elizabeth@rodriguez.com")
        self.selenium.find_element_by_id("id_codigo").clear()
        self.selenium.find_element_by_id("id_codigo").send_keys("112345")
        self.selenium.find_element_by_id("id_password").clear()
        self.selenium.find_element_by_id("id_password").send_keys("elizabeth")
        self.selenium.find_element_by_name("action").click()
        for i in range(3):
            try:
                if "OK" == self.selenium.find_element_by_xpath("//div[4]/span[2]").text: break
            except: pass
            time.sleep(1)
        else: self.fail("time out")