var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');
var creativeElements = require('../elements/destination-creative.js');
var modelInstanceElements = require('../elements/model-instance.js');
var inputs = {};
inputs.destinationCreative = creativeElements.inputs;
inputs.modelInstance = modelInstanceElements.inputs;
var ids = modelInstanceElements.ids;
var containers = {};
containers.destinationCreative = creativeElements.containers;
containers.modelInstance = modelInstanceElements.containers;

var destinationCreativeCreateUrl = "";
var creativeListingUrl = "";
var createVideoModelInstanceUrl = "";
var createVideoDescriptionModelInstanceUrl = "";
var featureId = "";
var creativeId = "";
var creativeName1 = helper.guid();
var loadTime = config.loadTime();
var launchUrl = "";
var campaignId = 242;
var resource_i_594_516 = "";
var helper = require('../utilities/helper.js');
var creativeName1 = helper.guid();

module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		destinationCreativeCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives/destinations/create";
		creativeListingUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives";

		resource_i_594_516 = 'C:/Services/nightwatch/resources/i-594-516.png';
		//login
		launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
  },
	'create Video Feature' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.destinationCreative.addFeature, loadTime)

		//add Video feature
		.click(inputs.destinationCreative.addFeature)
		.click(inputs.destinationCreative.featureTypes.video)

		.click(inputs.destinationCreative.blueprintSelect)
		.waitForElementVisible(inputs.destinationCreative.blueprints.infoVideoGallery, loadTime)
		.click(inputs.destinationCreative.blueprints.infoVideoGallery)

		//set feature properties
		.setValue(inputs.destinationCreative.feature.name, "Feature 1")
		.waitForElementVisible(inputs.destinationCreative.pages.blueprints.infoVideoGallery.galleryName, loadTime)
		.setValue(inputs.destinationCreative.pages.blueprints.infoVideoGallery.galleryName, "Apple Page")
		.setValue(inputs.destinationCreative.creative.name, creativeName1)

		//save
		.click(inputs.destinationCreative.save)
	},
	'test Creating a Video Description Model Instance (step 1: arrange)' : function (browser) {
		browser
		.waitForElementVisible(containers.destinationCreative.creativesListing, loadTime)

		//click new destination creative item in listing
		.useXpath()
		.click("//a[text()='" + creativeName1 + "']")
		.useCss()

		.waitForElementVisible(inputs.destinationCreative.models.videoDescription, loadTime)
		.click(inputs.destinationCreative.models.videoDescription)
		.waitForElementVisible(inputs.destinationCreative.modelInstanceCreate, loadTime)
		.click(inputs.destinationCreative.modelInstanceCreate)

		.waitForElementVisible(inputs.modelInstance.modelInstance.name, loadTime)
		.setValue(inputs.modelInstance.modelInstance.name, "name test 1")
		.setValue(inputs.modelInstance.modelInstance.resource, resource_i_594_516)

		.click(inputs.modelInstance.save)
	},
	'test Video Description Model Instance (step 2: arrange)' : function (browser) {
		browser

		//edit Video Description model instance that was just created
		.waitForElementVisible(inputs.modelInstance.modelInstanceListingItem, loadTime)
		.click(inputs.modelInstance.modelInstanceListingItem)

		//wait for model instance to be loaded
		.waitForElementVisible(inputs.modelInstance.modelInstance.name, loadTime)

		//assert model instance values
		 .assert.value(inputs.modelInstance.modelInstance.name, "name test 1")
		 .assert.visible(containers.modelInstance.resourceImage)

		.end()
	}


};
