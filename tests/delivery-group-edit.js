var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');

var deliveryGroupElements = require('../elements/delivery-group.js');
var deliveryGroupInputs = deliveryGroupElements.inputs;
var deliveryGroupContainers = deliveryGroupElements.containers;
var deliveryGroupLabels = deliveryGroupElements.labels;
var deliveryGroupIds = deliveryGroupElements.ids;
var deliveryGroupName1 = helper.guid();
var deliveryGroupName2 = helper.guid();
var deliveryGroupCreateUrl = "";

var campaignSummaryUrl = "";

var loadTime = config.loadTime();
var campaignId = 242;


module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		campaignSummaryUrl = browser.launch_url + "campaigns/" + campaignId + "/summary";
		deliveryGroupCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/deliverygroups/create";

		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl);
  },
	'create a delivery group' : function (browser) {
		browser

		.url(deliveryGroupCreateUrl)

		.waitForElementVisible(deliveryGroupContainers.deliveryGroupEditForm, loadTime)

		//fill in form values
		.waitForElementVisible(deliveryGroupInputs.deliveryGroup.name, loadTime)
		.setValue(deliveryGroupInputs.deliveryGroup.name, deliveryGroupName1)
		.click(deliveryGroupInputs.channelSelect)
		.click(deliveryGroupInputs.deliveryGroup.channels.abc)
		.setValue(deliveryGroupInputs.deliveryGroup.promotionalGoal, 1234)
		.setValue(deliveryGroupInputs.deliveryGroup.mediaSpend, 4567)

		.pause(1000)

		.click(deliveryGroupInputs.save)

		.waitForElementVisible(deliveryGroupContainers.deliveryGroupListing, loadTime)
	},
  'valide delivery group saved' : function (browser) {
		browser

    .useXpath()
		.click("//a[text()='" + deliveryGroupName1 + "']")
		.useCss()

    .waitForElementVisible(deliveryGroupContainers.deliveryGroupEditForm, loadTime)

		//fill in form values
		.assert.value(deliveryGroupInputs.deliveryGroup.name, deliveryGroupName1)
    .assert.visible(deliveryGroupInputs.deliveryGroup.channels.abc)
    .assert.value(deliveryGroupInputs.deliveryGroup.promotionalGoal, '1,234')
    .assert.value(deliveryGroupInputs.deliveryGroup.mediaSpend, '4,567')
	},
  'delivery group edit' : function (browser) {
    browser

    .clearValue(deliveryGroupInputs.deliveryGroup.name)
    .setValue(deliveryGroupInputs.deliveryGroup.name, deliveryGroupName2)
		.click(deliveryGroupInputs.channelSelect)
		.click(deliveryGroupInputs.deliveryGroup.channels.abcFamily)
    .clearValue(deliveryGroupInputs.deliveryGroup.promotionalGoal)
    .setValue(deliveryGroupInputs.deliveryGroup.promotionalGoal, '789')
    .clearValue(deliveryGroupInputs.deliveryGroup.mediaSpend)
    .setValue(deliveryGroupInputs.deliveryGroup.mediaSpend, '234')

	.pause(1000)

	.click(deliveryGroupInputs.save)

	.waitForElementVisible(deliveryGroupContainers.deliveryGroupListing, loadTime)
  },
  'valide delivery group edit saved' : function (browser) {
    browser

    .useXpath()
    .click("//a[text()='" + deliveryGroupName2 + "']")
    .useCss()

    .waitForElementVisible(deliveryGroupContainers.deliveryGroupEditForm, loadTime)

    //fill in form values
    .assert.value(deliveryGroupInputs.deliveryGroup.name, deliveryGroupName2)
    .assert.visible(deliveryGroupInputs.deliveryGroup.channels.abcFamily)
    .assert.value(deliveryGroupInputs.deliveryGroup.promotionalGoal, '789')
    .assert.value(deliveryGroupInputs.deliveryGroup.mediaSpend, '234')

    .end();
  }


};
