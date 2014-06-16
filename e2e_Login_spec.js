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
    
    it('maximum field length of UserID is 6 digits', function() {
        expect(element(by.id('user_id')).getAttribute('amp-maxlength')).toBe('6');
    });
    
    it('input type of UserID is number', function() {
        expect(element(by.id('user_id')).getAttribute('type')).toBe('number');
    });
    
    it('maximum field length of password is 6 digits', function() {
        expect(element(by.id('pin')).getAttribute('maxlength')).toBe('6');
    });
    
    it('input type of password is number', function() {
        expect(element(by.id('pin')).getAttribute('type')).toBe('number');
    });
        
    it('should be able to login with the correct credentials', function() {
        
        element(by.id('user_id')).sendKeys('174669');
        element(by.id('pin')).sendKeys('8557');
        element(by.id('submit')).click();
        ptor.sleep(5000);
        
        expect(ptor.getCurrentUrl()).toBe('https://dev.addus.com/amp/#/home');
    });
    
    it('should not be able to login with incorrect ID and correct password', function() {
        
        element(by.id('user_id')).sendKeys('17466');
        element(by.id('pin')).sendKeys('8557');
        element(by.id('submit')).click();
        ptor.sleep(3000);
        
        expect(ptor.getCurrentUrl()).not.toBe('https://dev.addus.com/amp/#/home');
    });
    
    it('should not be able to login with correct ID and incorrect password', function() {
        
        element(by.id('user_id')).sendKeys('174669');
        element(by.id('pin')).sendKeys('85577');
        element(by.id('submit')).click();
        ptor.sleep(3000);
        
        expect(ptor.getCurrentUrl()).not.toBe('https://dev.addus.com/amp/#/home');
    });

    describe('login with incorrect credentials', function() {
        beforeEach(function(){
            element(by.id('user_id')).sendKeys('174669');
            element(by.id('pin')).sendKeys('8556');
            element(by.id('submit')).click();
            ptor.sleep(3000);
        });
        
        it('should not be able to login with the incorrect credentials', function() {
            expect(ptor.getCurrentUrl()).not.toBe('https://dev.addus.com/amp/#/home');
        });


        it('should display a prompt when the credentials are not correct', function() {
            expect(element(by.id('popup')).isPresent()).toBe(true);
        });

        it('the content of prompt should be "The User ID or Password you entered is incorrect. Please re-enter."', function() {
            expect(element(by.css('.popup .message')).getText()).toEqual('The User ID or Password you entered is incorrect. Please re-enter.');
        });


        it('At login screen, the "incorrect password" prompt is closed after tapping on Ok, and the app is still stay at Login screen', function() {
            
            element(by.id('button_ok')).click();
            ptor.sleep(3000);

            expect(ptor.getCurrentUrl()).toBe('https://dev.addus.com/amp/#/login');
        });
    });

    it('should be able to display the check when click on the checkbox', function() {
        element(by.id('remember-label')).click();
        ptor.sleep(2000);
    
        expect(element(by.id('remember')).getAttribute('checked')).toBeTruthy();
    });
    
    it('Remember me checkbox is not checked after user is logged out and userID is not remain on the screen', function() {
        element(by.id('user_id')).sendKeys('174669');
        element(by.id('pin')).sendKeys('8557');
        element(by.id('remember-label')).click();
        element(by.id('submit')).click();
        ptor.sleep(5000);
        element(by.id('logout')).click();
        ptor.sleep(3000);

        expect(element(by.id('remember')).getAttribute('checked')).toBeTruthy();
    });
    
    it('Remember me checkbox is still checked after user is logged out and userID is still remain on the screen', function() {
        element(by.id('user_id')).sendKeys('174669');
        element(by.id('pin')).sendKeys('8557');
        element(by.id('remember-label')).click();
        element(by.id('submit')).click();
        ptor.sleep(5000);
        element(by.id('logout')).click();
        ptor.sleep(3000);

        expect(element(by.id('remember')).getAttribute('checked')).toBeTruthy();
        expect(element(by.id('user_id')).getAttribute('value')).toBe('174669');
    });

    it('should be navigate to Change Passwod screen when clicking on Change/Forgot my password', function() {
        element(by.css('.login form .button.forgot')).click();
        ptor.sleep(1000);
                
        expect(ptor.getCurrentUrl()).toBe('https://dev.addus.com/amp/#/password');
    });

});