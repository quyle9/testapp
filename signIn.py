import unittest
import sys
import os
from appium import webdriver
from appium.webdriver.common.touch_action import TouchAction
from appium.common.exceptions import NoSuchContextException
import datetime
import time


class MyTestCase(unittest.TestCase):
    def setUp(self):
        desired_caps = {}
        desired_caps['platformName'] = 'Android'
        desired_caps['platformVersion'] = '5.0.2'
        desired_caps['deviceName'] = 'HT36LW911240'
        desired_caps['appPackage'] = 'com.icontrol.converge.nga'
        desired_caps['appActivity'] = 'com.webileapps.fragments.MainActivity'
        desired_caps['noReset'] = 'True'
        desired_caps['automationName'] = 'UiAutomator2'


        self.driver = webdriver.Remote('http://0.0.0.0:4723/wd/hub', desired_caps)

    def testSignIn(self):
        self.driver.implicitly_wait(5000)
        username = self.driver.find_element_by_android_uiautomator('new UiSelector().resourceId("loginUsername")')
        username.send_keys('test')
        password = self.driver.find_element_by_android_uiautomator('new UiSelector().resourceId("loginPassword")')
        password.send_keys('test')

        signInBtn = self.driver.find_element_by_accessibility_id('Sign In')
        self.driver.press_keycode(66)
        self.driver.implicitly_wait(5000)
        error = self.driver.find_element_by_accessibility_id('Username or password invalid')
        self.assertTrue(error.is_displayed())

unittest
if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(MyTestCase)
    unittest.TextTestRunner(verbosity=2).run(suite)


"test again"