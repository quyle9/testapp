import os
import unittest
from appium import webdriver
from time import sleep

class LoginTestSuites(unittest.TestCase):
        "run testcases for Login screen on iOS"
        def setUp(self):
            "Set up Appium"
            desire_caps = {}
            desire_caps['platformName'] = 'iOS'
            desire_caps['platformVersion'] = '11.2'
            desire_caps['deviceName'] = 'iPhone X'
            #desire_caps['app'] = '/Users/quy/Downloads/wholesale-app-comcast-ios-0.4.0.581.ipa
            desire_caps['bundleId'] = 'com.icontrol.converge.nga'
            self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desire_caps)

        def tearDown(self):
            "Tear down the test"
            self.driver.quit()

        def check_status_SignIn_button_disable(self):
            signinButt = self.driver.find_element_by_ios_uiautomation()
test  ok ok test