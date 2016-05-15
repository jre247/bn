var loginService = require('../utilities/login.js');
var createCampaignUrl = "";
var validationSummary = '.validation-summary-errors';
var editCampaignLink = 'a[title="Edit"]';
var config = require('../utilities/config.js');
var resourceDirectory = config.getResourceDirectory();
var loadTime = config.loadTime();

var campaignElements = require('../elements/campaign.js');
var inputs = campaignElements.inputs;
var ids = campaignElements.ids;
var containers = campaignElements.containers;
var labels = campaignElements.labels;

var resource_i_162_114 = "";

module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		createCampaignUrl = browser.launch_url + 'campaigns/create';

		resource_i_162_114 = resourceDirectory + '/i-162-114.png';
		console.log('resource_i_162_114: ' + resource_i_162_114);

		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
  },
   'test campaign resource upload (step 1: arrange)' : function (browser) {
		browser

		.url(createCampaignUrl)

		//set form values
		.setValue(inputs.campaign.name, 'Campaign Test 1')
		.click(inputs.campaign.internal)
		.click(inputs.campaign.mediaAgencies.bbdo)
		.click(inputs.campaign.creativeAgencies.caratDET)
		.click(inputs.campaign.products.fiveHourEnergy)
		.click(inputs.campaign.campaignTypes.enterprise)
		.setValue(inputs.campaign.resource, resource_i_162_114)

		.pause(1000)

		.click(inputs.save)
	},
	'test campaign resource upload (step 2: assert)' : function (browser) {
		//navigate to edit campaign page
		browser.waitForElementVisible(editCampaignLink, loadTime);
		browser.click(editCampaignLink);

		//assert
		browser.waitForElementVisible(inputs.campaign.thumbnailName, loadTime);
		browser.assert.visible(containers.formPreview);
		browser.expect.element(inputs.campaign.thumbnailName).text.to.equal('i-162-114');

		//.end();
	}

};
