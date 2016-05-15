var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');
var creativeElements = require('../elements/promotional-creative.js');
var inputs = creativeElements.inputs;
var containers = creativeElements.containers;
var labels = creativeElements.labels;
var ids = creativeElements.ids;

var resourceDirectory = config.getResourceDirectory();
var promotionalCreativeCreateUrl = "";
var creativeListingUrl = "";
var creativeName1 = helper.guid();
var creativeName2 = helper.guid();
var loadTime = config.loadTime();
var campaignId = 242;
var resource_i_306_564;
var resource_i_162_114;

module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		promotionalCreativeCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives/promotionals/create"
		creativeListingUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives";

		resource_i_162_114 = resourceDirectory + '/i-162-114.png';
		resource_i_306_564 = resourceDirectory + '/i_306_564.png';

		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
  },
	'test creating a promotional creative with empty fields causes name validation error' : function (browser) {
		browser

		.url(promotionalCreativeCreateUrl)
		.waitForElementVisible(containers.promotionalEditForm, loadTime)
		.click(inputs.save)

		.waitForElementVisible(containers.errors.validationSummary, loadTime)
		.assert.containsText(containers.errors.validationSummary, labels.errors.nameIsRequired)
		.assert.containsText(containers.errors.validationSummary, labels.errors.adTypeIsRequired)
		.assert.containsText(containers.errors.validationSummary, labels.errors.adFunctionIsRequired)
		.assert.containsText(containers.errors.validationSummary, labels.errors.adFormatIsRequired)
	},
	'test creating a promotional creative will save' : function (browser) {
		browser

		.url(promotionalCreativeCreateUrl)

		.waitForElementVisible(containers.promotionalEditForm, loadTime)

		//fill in form values
		.setValue(inputs.creative.name, creativeName1)
		.setValue(inputs.creative.description, "blahz")
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
	'test promotional creative field values persisted after create' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click on the promotional creative just created
		.useXpath()
		.click("//a[text()='" + creativeName1 + "']")
		.useCss()

		//assert form values
		.waitForElementVisible(inputs.creative.name, loadTime)
		.assert.value(inputs.creative.name, creativeName1)
		.assert.visible(inputs.adTypes.animatedBanner)
		.assert.visible(inputs.adFunctions.app)
		.assert.visible(inputs.adFormats.channelGuide)
	},
	'test promotional creative Ad Format is read only' : function (browser) {
		browser

		.assert.visible(inputs.disabledAdFormat)
	},
	'test promotional creative Ad Type is read only' : function (browser) {
		browser

		.assert.visible(inputs.disabledAdType)
	},
	'test editing a promotional creative' : function (browser) {
		browser
		.url(creativeListingUrl)
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click on the promotional creative just created
		.useXpath()
		.click("//a[text()='" + creativeName1 + "']")
		.useCss()

		.waitForElementVisible(inputs.creative.name, loadTime)
		.clearValue(inputs.creative.name)
		.setValue(inputs.creative.name, creativeName2)
		.clearValue(inputs.creative.description)
		.setValue(inputs.creative.description, "blahz 2")

		.click(inputs.adFunctionsSelect)
		.click(inputs.adFunctions.onDemand)

		.pause(1000)

		.click(inputs.save)
	},
	'test promotional creative field values persisted after edit' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click on the promotional creative just created
		.useXpath()
		.waitForElementVisible("//a[text()='" + creativeName2 + "']", loadTime)
		.click("//a[text()='" + creativeName2 + "']")
		.useCss()

		//assert form values
		.waitForElementVisible(inputs.creative.name, loadTime)
		.assert.value(inputs.creative.name, creativeName2)
		.assert.value(inputs.creative.description, "blahz 2")
		.assert.visible(inputs.adTypes.animatedBanner)
		.assert.visible(inputs.adFunctions.onDemand)
	},
	'test duplicate creative name' : function (browser) {
		browser
		.url(promotionalCreativeCreateUrl)
		.waitForElementVisible(containers.promotionalEditForm, loadTime)

		//fill in duplicate promotional creative name
		.clearValue(inputs.creative.name)
		.setValue(inputs.creative.name, creativeName2)

		.click(inputs.save)

		.waitForElementVisible(containers.errors.validationSummary, loadTime)
		.assert.containsText(containers.errors.validationSummary, labels.errors.uniqueCreativeName.replace('{0}', creativeName2))

		.end();
	}

};
