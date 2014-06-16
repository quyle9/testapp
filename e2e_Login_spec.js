'use strict';

describe('Addus Login e2e testing: ', function() {

    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
        browser.get('https://dev.addus.com/amp/');
        ptor.sleep(3000);
    });
    
    afterEach(function() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });
    
    // test default route
	it('should navigate to login by default', function() {
		expect(ptor.driver.getCurrentUrl()).toBe('https://dev.addus.com/amp/#/login');
	});
    
    it('should not be able to login when userID and password are empty', function() {
        element(by.id('submit')).click();
        ptor.sleep(3000);

        expect(ptor.getCurrentUrl()).not.toBe('https://dev.addus.com/amp/#/home');
    });
    

});