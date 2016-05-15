var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');
var creativeElements = require('../elements/promotional-creative.js');
var inputs = creativeElements.inputs;
var ids = creativeElements.ids;
var containers = creativeElements.containers;

var promotionalCreativeCreateUrl = "";
var creativeListingUrl = ""
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
		promotionalCreativeCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives/promotionals/create"
		creativeListingUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives";

		resource_i_162_114 = resourceDirectory + '/i-162-114.png';

		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
  },
	'test promotional creative SD resource upload' : function (browser) {
		browser

		.url(promotionalCreativeCreateUrl)

		.waitForElementVisible(containers.promotionalEditForm, loadTime)

		//fill in form values
		.setValue(inputs.creative.name, creativeName3)
		.click(inputs.adTypesSelect)
		.click(inputs.adTypes.animatedBanner)
		.click(inputs.adFunctionsSelect)
		.click(inputs.adFunctions.app)
		.click(inputs.adFormatSelect)
		.click(inputs.adFormats.channelGuide)
		.setValue(inputs.resources.sd, resource_i_162_114)

		.pause(1000)

		.click(inputs.save)
	},
	'test promotional creative SD resource upload worked' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click on the promotional creative just created
		.useXpath()
		.waitForElementVisible("//a[text()='" + creativeName3 + "']", loadTime)
		.click("//a[text()='" + creativeName3 + "']")
		.useCss()

		//assert
		.waitForElementVisible(containers.resourceImage, loadTime)
		.assert.visible(containers.resourceImage)

	},
	'test promotional creative HD resource upload' : function (browser) {
		browser

		.url(promotionalCreativeCreateUrl)
		.waitForElementVisible(containers.promotionalEditForm, loadTime)

		//fill in form values
		.setValue(inputs.creative.name, creativeName4)
		.click(inputs.adTypesSelect)
		.click(inputs.adTypes.animatedBanner)
		.click(inputs.adFunctionsSelect)
		.click(inputs.adFunctions.app)
		.click(inputs.adFormatSelect)
		.click(inputs.adFormats.channelGuide)
		.setValue(inputs.resources.hd, resource_i_162_114)

		.pause(1000)

		.click(inputs.save)
	},
	'test promotional creative HD resource upload worked' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click on the promotional creative just created
		.useXpath()
		.waitForElementVisible("//a[text()='" + creativeName4 + "']", loadTime)
		.click("//a[text()='" + creativeName4 + "']")
		.useCss()

		//assert
		.waitForElementVisible(containers.resourceImage, loadTime)
		.assert.visible(containers.resourceImage)
	},
	'test promotional creative SD and HD resources upload' : function (browser) {
		browser

		.url(promotionalCreativeCreateUrl)
		.waitForElementVisible(containers.promotionalEditForm, loadTime)

		//fill in form values
		.setValue(inputs.creative.name, creativeName5)
		.click(inputs.adTypesSelect)
		.click(inputs.adTypes.animatedBanner)
		.click(inputs.adFunctionsSelect)
		.click(inputs.adFunctions.app)
		.click(inputs.adFormatSelect)
		.click(inputs.adFormats.channelGuide)
		.setValue(inputs.resources.sd, resource_i_162_114)
		.setValue(inputs.resources.hd, resource_i_162_114)

		.pause(1000)

		.click(inputs.save)
	},
	'test promotional creative SD and HD resources upload worked' : function (browser) {
		browser.waitForElementVisible(containers.creativesListing, loadTime)

		//click on the promotional creative just created
		browser.useXpath()
		browser.waitForElementVisible("//a[text()='" + creativeName5 + "']", loadTime)
		browser.click("//a[text()='" + creativeName5 + "']")
		browser.useCss()

		//assert
		browser.waitForElementVisible(containers.resourceImage, loadTime)
		browser.assert.visible(containers.resourceImage)
		browser.expect.element(inputs.creative.resourceName).text.to.equal('i-162-114.png');

		browser.end();
	}
};
