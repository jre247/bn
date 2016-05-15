var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var loadTime = config.loadTime();
var campaignElements = require('../elements/campaign.js');
var inputs = campaignElements.inputs;
var containers = campaignElements.containers;
var labels = campaignElements.labels;
var ids = campaignElements.ids;

var createCampaignUrl = "";
var validationSummary = '.validation-summary-errors';
var editCampaignLink = 'a[title="Edit"]';

module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		createCampaignUrl = browser.launch_url + '/campaigns/create';

		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
    },
   'test campaign create with blank fields causing validation errors' : function (browser) {
		browser

		.url(createCampaignUrl)

		//save
		.click(inputs.save)

		.pause(1000)

		//assert
		.assert.containsText(validationSummary, labels.errors.nameIsRequired)
		.assert.containsText(validationSummary, labels.errors.mediaAgencyIsRequired)
		.assert.containsText(validationSummary, labels.errors.creativeAgencyIsRequired)
		.assert.containsText(validationSummary, labels.errors.productIsRequired)
		.assert.containsText(validationSummary, labels.errors.campaignTypeIsRequired)
	},
   'test campaign create saves correctly' : function (browser) {
		browser

		.url(createCampaignUrl)

		//set form values
		.setValue(inputs.campaign.name, 'Campaign Test 1')
		.setValue(inputs.campaign.googleAnalyticsIds, '123, 1234')
		.click(inputs.campaign.internal)
		.click(inputs.campaign.mediaAgencies.bbdo)
		.click(inputs.campaign.creativeAgencies.caratDET)
		.click(inputs.campaign.products.axeDeo)
		.click(inputs.campaign.campaignTypes.express)

		.click(inputs.save)
	},
   'test campaign has correct field values (1)' : function (browser) {
		browser

		//navigate to edit campaign page
		.waitForElementVisible(editCampaignLink, loadTime)
		.click(editCampaignLink)
		.waitForElementVisible(inputs.campaign.name, loadTime)

		//assert
		.assert.value(inputs.campaign.name, 'Campaign Test 1')
		.assert.value(inputs.campaign.googleAnalyticsIds, '123, 1234')
		.assert.value(inputs.campaign.mediaAgency, ids.agencies.bbdo)
		.assert.value(inputs.campaign.creativeAgency, ids.agencies.caratDET)
		.assert.value(inputs.campaign.product, ids.products.axeDeo)
		.assert.attributeContains(inputs.campaign.campaignTypes.express, 'checked', 'true')

		//save
		.click(inputs.save) //to redirect back to campaign summary page
	},
   'test campaign edit saves correctly' : function (browser) {
		browser

		//navigate to edit campaign page
		.waitForElementVisible(editCampaignLink, loadTime)
		.click(editCampaignLink)
		.waitForElementVisible(inputs.campaign.name, loadTime)

		//set form values
		.clearValue(inputs.campaign.name)
		.setValue(inputs.campaign.name, 'Campaign Test 2')
		.clearValue(inputs.campaign.googleAnalyticsIds)
		.setValue(inputs.campaign.googleAnalyticsIds, '456, 789')
		.click(inputs.campaign.mediaAgencies.caratDET)
		.click(inputs.campaign.creativeAgencies.bbdo)
		.click(inputs.campaign.products.fiveHourEnergy)
		.click(inputs.campaign.campaignTypes.express)

		//save
		.click(inputs.save)
	},
   'test campaign has correct field values (2)' : function (browser) {
		browser

		//navigate to edit campaign page
		.waitForElementVisible(editCampaignLink, loadTime)
		.click(editCampaignLink)
		.waitForElementVisible(inputs.campaign.name, loadTime)

		//assert
		.assert.value(inputs.campaign.name, 'Campaign Test 2')
		.assert.value(inputs.campaign.googleAnalyticsIds, '456, 789')
		.assert.value(inputs.campaign.mediaAgency, ids.agencies.caratDET)
		.assert.value(inputs.campaign.creativeAgency, ids.agencies.bbdo)
		.assert.value(inputs.campaign.product, ids.products.fiveHourEnergy)
		.assert.attributeContains(inputs.campaign.campaignTypes.express, 'checked', 'true')

		.end();
	},
};
