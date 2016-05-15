var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');

var userAdminElements = require('../elements/user-administration.js');
var inputs = userAdminElements.inputs;
var ids = userAdminElements.ids;
var values = userAdminElements.values;

var loadTime = config.loadTime();
var userAdminUrl = "";
var validationSummary = '.validation-summary-errors';
var modalDialog = "#modal-edit-user";
var loadingWindow = ".loading";
var firstNameValue = "Bob";
var lastNameValue = "Evans";

module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		userAdminUrl = browser.launch_url + 'admin/users';

		console.log('userAdminUrl: ' + userAdminUrl);

		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
  },
   'test selecting an internal role also selects employee role (Step 1: Arrange)' : function (browser) {
		browser

		.url(userAdminUrl)

		.waitForElementVisible(inputs.newUser, loadTime)
		.waitForElementNotVisible(loadingWindow, loadTime)
		.click(inputs.newUser)

		.waitForElementVisible(inputs.email, loadTime)

		//fill in form values)
		.waitForElementVisible(inputs.admin, loadTime)
		.click(inputs.admin)
		.pause(1000)
		.waitForElementVisible(inputs.employeeSelected, loadTime)
		.assert.visible(inputs.employeeSelected)
	},
	'test selecting an external role does not select employee role (Step 1: Arrange)' : function (browser) {
		browser

		.waitForElementVisible(inputs.client, loadTime)
		.click(inputs.client)

		.waitForElementVisible(inputs.clientSelected, loadTime)
		.assert.visible(inputs.clientSelected)
		.assert.elementNotPresent(inputs.employeeSelected)
	},
	'test Agency Partner selection displays Media Agency select list' : function (browser) {
		browser

		.waitForElementVisible(inputs.agencyPartner, loadTime)
		.click(inputs.agencyPartner)
		.waitForElementVisible(inputs.mediaAgencySelectlist, loadTime)
		.assert.visible(inputs.mediaAgencySelectlist)
		.assert.hidden(inputs.advertiserSelectlist)
	},
	'test Client selection displays Advertiser select list' : function (browser) {
		browser

		.click(inputs.client)
		.waitForElementVisible(inputs.advertiserSelectlist, loadTime)
		.assert.hidden(inputs.mediaAgencySelectlist)
		.assert.visible(inputs.advertiserSelectlist)
		.click(inputs.close)
	},
	'test Advertiser selection persists (Step 1: Arrange)' : function (browser) {
		browser

		.waitForElementNotVisible(modalDialog, loadTime)
		.waitForElementVisible(inputs.newUser, loadTime)
		.click(inputs.newUser)

		.waitForElementVisible(inputs.email, loadTime)

		//fill in form values
		.click(inputs.internal)
		.setValue(inputs.email, values.emailValue1)
		.setValue(inputs.firstName, firstNameValue)
		.setValue(inputs.lastName, lastNameValue)
		.click(inputs.client)
		.waitForElementVisible(inputs.advertiserItem, loadTime)
		.click(inputs.advertiserItem)

		.click(inputs.saveUser)
	},
	'test Advertiser selection persists (Step 2: Assert)' : function (browser) {
		browser

		.waitForElementNotVisible(modalDialog, loadTime)
		.waitForElementVisible(inputs.newUser, loadTime)

		.waitForElementVisible(inputs.editUser, loadTime)
		.click(inputs.editUser)

		.waitForElementVisible(inputs.advertiserSelectlist, loadTime)
		.assert.value(inputs.advertiserSelectlist, ids.advertisers.generalMotors)
		.click(inputs.close)
	},
	'test Media Agency selection persists (Step 1: Arrange)' : function (browser) {
		browser

		.waitForElementNotVisible(modalDialog, loadTime)
		.waitForElementVisible(inputs.newUser, loadTime)
		.click(inputs.newUser)

		.waitForElementVisible(inputs.email, loadTime)

		//fill in form values
		.click(inputs.internal)
		.setValue(inputs.email, values.emailValue2)
		.setValue(inputs.firstName, firstNameValue)
		.setValue(inputs.lastName, lastNameValue)
		.click(inputs.agencyPartner)
		.waitForElementVisible(inputs.mediaAgencyItem, loadTime)
		.click(inputs.mediaAgencyItem)
		.click(inputs.saveUser)
	},
	'test Media Agency selection persists (Step 2: Assert)' : function (browser) {
		browser

		.waitForElementVisible(inputs.newUser, loadTime)

		.waitForElementVisible(inputs.editUser2, loadTime)
		.click(inputs.editUser2)

		.waitForElementVisible(inputs.mediaAgencySelectlist, loadTime)
		.assert.value(inputs.mediaAgencySelectlist, ids.mediaAgencies.bbdo)
		.click(inputs.close)
	},
	'test Media Partner selection persists (Step 1: Arrange)' : function (browser) {
		browser

		.waitForElementNotVisible(modalDialog, loadTime)
		.waitForElementVisible(inputs.newUser, loadTime)
		.click(inputs.newUser)

		.waitForElementVisible(inputs.email, loadTime)

		//fill in form values
		.click(inputs.internal)
		.setValue(inputs.email, values.emailValue3)
		.setValue(inputs.firstName, firstNameValue)
		.setValue(inputs.lastName, lastNameValue)
		.click(inputs.mediaPartner)
		.waitForElementVisible(inputs.mediaPartners.abc, loadTime)
		.click(inputs.mediaPartners.abc)
		.click(inputs.saveUser)
	},
	'test Media Partner selection persists (Step 2: Assert)' : function (browser) {
		browser

		.waitForElementVisible(inputs.newUser, loadTime)

		.waitForElementVisible(inputs.editUser3, loadTime)
		.click(inputs.editUser3)

		.waitForElementVisible(inputs.mediaPartnerSelectlist, loadTime)
		.assert.value(inputs.mediaPartnerSelectlist, ids.mediaPartners.abc)
		.click(inputs.close)
	},
	'test User base level properties persist (Step 1: Arrange)' : function (browser) {
		browser

		.waitForElementNotVisible(modalDialog, loadTime)
		.waitForElementVisible(inputs.newUser, loadTime)
		.click(inputs.newUser)

		.waitForElementVisible(inputs.email, loadTime)

		//fill in form values
		.click(inputs.internal)
		.setValue(inputs.email, values.emailValue4)
		.setValue(inputs.firstName, firstNameValue)
		.setValue(inputs.lastName, lastNameValue)
		.click(inputs.agencyPartner)
		.waitForElementVisible(inputs.mediaAgencyItem, loadTime)
		.click(inputs.mediaAgencyItem)
		.click(inputs.saveUser)
	},
	'test User base level properties persist (Step 2: Assert)' : function (browser) {
		browser

		.waitForElementNotVisible(modalDialog, loadTime)
		.waitForElementVisible(inputs.newUser, loadTime)

		.waitForElementVisible(inputs.editUser4, loadTime)
		.click(inputs.editUser4)

		.assert.value(inputs.mediaAgencySelectlist, ids.mediaAgencies.bbdo)
		.waitForElementVisible(inputs.internalSelected, loadTime)
		.assert.visible(inputs.internalSelected)
		.assert.value(inputs.firstName, firstNameValue)
		.assert.value(inputs.lastName, lastNameValue)
		.assert.value(inputs.email, values.emailValue4)

		.end();
	}
};
