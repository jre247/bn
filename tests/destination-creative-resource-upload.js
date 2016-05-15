var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');
var creativeElements = require('../elements/destination-creative.js');
var inputs = creativeElements.inputs;
var ids = creativeElements.ids;
var containers = creativeElements.containers;

var destinationCreativeCreateUrl = "";
var creativeListingUrl = ""
var destinationCreativeListingItem = ".updated .col-name a";
var destinationEditForm = '#campaign-content-container';
var creativesListing = "#campaign-creatives";
var creativeName1 = helper.guid();
var creativeName2 = helper.guid();
var creativeName3 = helper.guid();
var creativeName4 = helper.guid();
var creativeName5 = helper.guid();
var creativeName6 = helper.guid();
var creativeName7 = helper.guid();
var loadTime = config.loadTime();
var campaignId = 242;
var resourceDirectory = config.getResourceDirectory();
var resource_i_162_114 = "";

module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		destinationCreativeCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives/destinations/create";
		console.log('destinationCreativeCreateUrl: ' + destinationCreativeCreateUrl);
		creativeListingUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives";
		console.log('creativeListingUrl: ' + creativeListingUrl);

		resource_i_162_114 = resourceDirectory + '/i-162-114.png';

		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
  },
	'test destination creative resource upload' : function (browser) {
		browser

		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(destinationEditForm, loadTime)

		//fill in form values
		.setValue(inputs.creative.name, creativeName1)
		.setValue(inputs.creative.description, "grapefruit is a fruit")
		.setValue(inputs.creative.thumbnail, resource_i_162_114)

		.pause(1000)

		.click(inputs.save)
	},
	'test destination creative resource upload worked' : function (browser) {
		browser.waitForElementVisible(creativesListing, loadTime)

		//click on the destination creative just created
		browser.useXpath()
		browser.waitForElementVisible("//a[text()='" + creativeName1 + "']", loadTime)
		browser.click("//a[text()='" + creativeName1 + "']")
		browser.useCss()

		//assert
		browser.waitForElementVisible(containers.resourceImage, loadTime)
		browser.assert.visible(containers.resourceImage)
		browser.expect.element(inputs.creative.thumbnailName).text.to.equal('i-162-114.png');
	}

};
