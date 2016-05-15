var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');
var creativeElements = require('../elements/destination-creative.js');
var inputs = creativeElements.inputs;
var containers = creativeElements.containers;
var labels = creativeElements.labels;
var ids = creativeElements.ids;
var pages = inputs.pages;

var destinationCreativeCreateUrl = "";
var creativeListingUrl = "";
var createVideoModelInstanceUrl = "";
var createVideoDescriptionModelInstanceUrl = "";
var featureId = "";
var creativeId = "";
var creativeName1 = helper.guid();
var creativeName2 = helper.guid();
var creativeName3 = helper.guid();
var creativeName4 = helper.guid();
var creativeName5 = helper.guid();
var creativeName6 = helper.guid();
var creativeName7 = helper.guid();
var creativeName8 = helper.guid();
var creativeName9 = helper.guid();
var creativeName10 = helper.guid();
var creativeName11 = helper.guid();
var creativeName12 = helper.guid();
var creativeName13 = helper.guid();
var creativeName14 = helper.guid();
var loadTime = config.loadTime();
var launchUrl = "";
var campaignId = 242;
var inactivityThreshold = "500";


module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		destinationCreativeCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives/destinations/create";
		console.log('destinationCreativeCreateUrl: ' + destinationCreativeCreateUrl);
		creativeListingUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives";
		console.log('creativeListingUrl: ' + creativeListingUrl);

		//login
		launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
  },
	'test deleting feature removes feature, before saving' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		//add calculator style feature and then delete it
		.click(inputs.addFeature)
		.click(inputs.featureTypes.combination)

		.click(inputs.removeFeature)

		.pause(1000)

		//assert feature has been deleted
		.assert.elementNotPresent(containers.featureItem)
	},
   'test deleting feature among a list of features will remove the correct feature, before saving' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		.click(inputs.addFeature)
		.click(inputs.featureTypes.combination)

		.click(inputs.addFeature)
		.click(inputs.featureTypes.emailEntry)

		.click(inputs.addFeature)
		.click(inputs.featureTypes.framed)

		//delete combination style feature
		.click(containers.featureTypes.combination + ' ' + inputs.removeFeature)

		.pause(1000)

		//assert calculator style feature has been deleted
		.assert.elementNotPresent('div[data-featuretype-id="10004"]')
	},
  'test creating a destination creative with only name and description' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		.setValue(inputs.creative.name, creativeName1)
		.pause(1000)
		.setValue(inputs.creative.description, "grapefruit is a fruit")

		.click(inputs.save)

		.waitForElementVisible(containers.creativesListing, loadTime)
		.assert.containsText(inputs.destinationCreativeListingNewItem, creativeName1)
	},
  'test existing creative has correct name and description' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click by text
		.useXpath()
		.click("//a[text()='" + creativeName1 + "']")
		.useCss()

		//set name and description
		.waitForElementVisible(inputs.creative.name, loadTime)
		.assert.value(inputs.creative.name, creativeName1)
		.assert.value(inputs.creative.description, "grapefruit is a fruit")
	},
	'create a destination creative with name, description, and inactivity threshold' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.creative.name, loadTime)
		.waitForElementVisible(inputs.creative.inactivityThreshold, loadTime)

		.setValue(inputs.creative.name, creativeName2)
		.setValue(inputs.creative.inactivityThreshold, inactivityThreshold)

		.click(inputs.save)
	},
	'test creative has correct inactivity threshold' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click by text
		.useXpath()
		.click("//a[text()='" + creativeName2 + "']")
		.useCss()

		//set name and description
		.waitForElementVisible(inputs.creative.inactivityThreshold, loadTime)
		.assert.value(inputs.creative.inactivityThreshold, inactivityThreshold)
	},
  'test new creative cannot use a name that exists for another creative' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		.setValue(inputs.creative.name, creativeName1)
		.pause(2000)
		.setValue(inputs.creative.description, "grapefruit is an awesome fruit")
		.pause(1000)

		.waitForElementVisible(containers.errors.validationSummary, loadTime)
		.assert.containsText(containers.errors.validationSummary, labels.errors.uniqueCreativeName.replace('{0}', creativeName1))
	},
   'test Combination feature has correct properties (step 1: arrange)' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		.click(inputs.addFeature)
		.click(inputs.featureTypes.combination)

		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.information)

		//set feature properties
		.setValue(inputs.feature.name, "Feature 2")
		.waitForElementVisible(inputs.pages.blueprints.information.galleryName, loadTime)
		.setValue(inputs.pages.blueprints.information.galleryName, "Apple Page")
		.setValue(inputs.creative.name, creativeName4)

		//save
		.click(inputs.save)
	},
   'test Combination feature has correct properties (step 2: assert)' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click new destination creative item in listing
		.useXpath()
		.click("//a[text()='" + creativeName4 + "']")
		.useCss()

		//assert feature properties
		.waitForElementVisible(inputs.feature.name, loadTime)
		.assert.value(inputs.feature.name, "Feature 2")
		.waitForElementVisible(inputs.pages.blueprints.information.galleryName, loadTime)
		.assert.value(inputs.pages.blueprints.information.galleryName, "Apple Page")
	},
   'test Image feature has correct properties (step 1: arrange)' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		.click(inputs.addFeature)
		.click(inputs.featureTypes.image)

		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.imageGallery)

		//set feature properties
		.setValue(inputs.feature.name, "Feature 1")
		.waitForElementVisible(inputs.pages.blueprints.imageGallery.galleryName, loadTime)
		.setValue(inputs.pages.blueprints.imageGallery.galleryName, "Apple Page")
		.setValue(inputs.creative.name, creativeName5)

		//save
		.click(inputs.save)
	},
   'test Image feature has correct properties (step 2: assert)' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click new destination creative item in listing
		.useXpath()
		.click("//a[text()='" + creativeName5 + "']")
		.useCss()

		//assert feature properties
		.waitForElementVisible(inputs.feature.name, loadTime)
		.assert.value(inputs.feature.name, "Feature 1")
		.assert.value(inputs.pages.blueprints.imageGallery.galleryName, "Apple Page")
	},
   'test Questionaire feature has correct properties (step 1: arrange)' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		//add Questionaire feature
		.click(inputs.addFeature)
		.click(inputs.featureTypes.questionaire)

		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.survey)

		//set feature properties
		.setValue(inputs.feature.name, "Feature 1")
		.waitForElementVisible(inputs.pages.blueprints.survey.intro, loadTime)
		.setValue(inputs.pages.blueprints.survey.intro, "Apple Page")
		.setValue(inputs.pages.blueprints.survey.exitName, "Banana Page")
		.setValue(inputs.pages.blueprints.survey.thankYou, "Banana 2 Page")
		.setValue(inputs.creative.name, creativeName6)

		//save
		.click(inputs.save)
	},
   'test Questionaire feature has correct properties (step 2: assert)' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click new destination creative item in listing
		.useXpath()
		.click("//a[text()='" + creativeName6 + "']")
		.useCss()
		.waitForElementVisible(inputs.feature.name, loadTime)

		//assert feature properties
		.assert.value(inputs.feature.name, "Feature 1")
		.waitForElementVisible(inputs.pages.blueprints.survey.intro, loadTime)
		.assert.value(inputs.pages.blueprints.survey.intro, "Apple Page")
		.assert.value(inputs.pages.blueprints.survey.exitName, "Banana Page")
		.assert.value(inputs.pages.blueprints.survey.thankYou, "Banana 2 Page")
	},
	'test Video feature has correct properties (step 1: arrange)' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		//add Video feature
		.click(inputs.addFeature)
		.click(inputs.featureTypes.video)

		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.infoVideoGallery)

		//set feature properties
		.setValue(inputs.feature.name, "Feature 1")
		.waitForElementVisible(inputs.pages.blueprints.infoVideoGallery.galleryName, loadTime)
		.setValue(inputs.pages.blueprints.infoVideoGallery.galleryName, "Apple Page")
		.setValue(inputs.creative.name, creativeName7)

		//save
		.click(inputs.save)
	},
   'test Video feature has correct properties (step 2: assert)' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click new destination creative item in listing
		.useXpath()
		.click("//a[text()='" + creativeName7 + "']")
		.useCss()
		.waitForElementVisible(inputs.feature.name, loadTime)

		//assert feature properties
		.assert.value(inputs.feature.name, "Feature 1")
		.assert.value(inputs.pages.blueprints.infoVideoGallery.galleryName, "Apple Page")
	},
	'test switching between new creative feature pages displays correct page fields' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		//add Video feature
		.click(inputs.addFeature)
		.click(inputs.featureTypes.video)

		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.infoVideoGallery)

		//set page name
		.waitForElementVisible(inputs.pages.blueprints.infoVideoGallery.galleryName, loadTime)
		.setValue(inputs.pages.blueprints.infoVideoGallery.galleryName, "Apple Page")

		//now select other blueprint and make sure Info Video Gallery's page is not displayed
		.click(inputs.blueprintSelect)
        .click(inputs.blueprints.standAloneVideoGallery)
		.assert.elementNotPresent(inputs.pages.blueprints.infoVideoGallery.galleryName)

        //select Info Video Gallery blueprint and make sure its page is displayed
		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.infoVideoGallery)
		.waitForElementVisible(inputs.pages.blueprints.infoVideoGallery.galleryName, loadTime)
	},
	'test switching between new creative feature pages clears page field value after switching back' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		//add Video feature
		.click(inputs.addFeature)
		.click(inputs.featureTypes.video)

		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.infoVideoGallery)

		//set page name
		.waitForElementVisible(inputs.pages.blueprints.infoVideoGallery.galleryName, loadTime)
		.setValue(inputs.pages.blueprints.infoVideoGallery.galleryName, "Apple Page")

		//now select other blueprint and make sure Info Video Gallery's page is not displayed
		.click(inputs.blueprintSelect)
        .click(inputs.blueprints.standAloneVideoGallery)

        //select Info Video Gallery blueprint and make sure its page is displayed
		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.infoVideoGallery)
		.waitForElementVisible(inputs.pages.blueprints.infoVideoGallery.galleryName, loadTime)
        .getValue(inputs.pages.blueprints.infoVideoGallery.galleryName, function(result){
			console.log(result.value);
			this.assert.equal(result.value, "");
		});
	},
	'test Video Description models display (step 1: arrange)' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		//add Video feature
		.click(inputs.addFeature)
		.click(inputs.featureTypes.video)

		//select Info Video Gallery blueprint
		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.infoVideoGallery)

		//set feature properties
		.setValue(inputs.feature.name, "Feature 1")
		.waitForElementVisible(inputs.pages.blueprints.infoVideoGallery.galleryName, loadTime)
		.setValue(inputs.pages.blueprints.infoVideoGallery.galleryName, "Apple Page")
		.setValue(inputs.creative.name, creativeName8)

		//save
		.click(inputs.save)
	},
	'test Video Description models display (step 2: assert)' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click new destination creative item in listing
		.useXpath()
		.click("//a[text()='" + creativeName8 + "']")
		.useCss()
		.waitForElementVisible(inputs.feature.name, loadTime)

		//assert Video model shows
		.waitForElementVisible(inputs.models.videoDescription, loadTime)
		.waitForElementVisible(inputs.models.video, loadTime)
	},
	'test Image models display (step 1: arrange)' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		.click(inputs.addFeature)
		.click(inputs.featureTypes.image)
		.click(inputs.blueprintSelect)
		.waitForElementVisible(inputs.blueprints.imageGallery, loadTime)
		.click(inputs.blueprints.imageGallery)

		//set feature properties
		.setValue(inputs.feature.name, "Feature 1")
		.waitForElementVisible(inputs.pages.blueprints.imageGallery.galleryName, loadTime)
		.setValue(inputs.pages.blueprints.imageGallery.galleryName, "Apple Page")
		.setValue(inputs.creative.name, creativeName9)

		//save
		.click(inputs.save)
	},
	'test Image models display (step 2: assert)' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click new destination creative item in listing
		.useXpath()
		.click("//a[text()='" + creativeName9 + "']")
		.useCss()
		.waitForElementVisible(inputs.feature.name, loadTime)

		//assert Video model shows
		.waitForElementVisible(inputs.models.image, loadTime)
	},
	'test Email Entry models display (step 1: arrange)' : function (browser) {
		browser
		.url(destinationCreativeCreateUrl)
		.waitForElementVisible(inputs.addFeature, loadTime)

		.click(inputs.addFeature)
		.click(inputs.featureTypes.emailEntry)

		.click(inputs.blueprintSelect)
		.click(inputs.blueprints.rfi)

		//set feature properties
		.setValue(inputs.feature.name, "Feature 1")
		.setValue(inputs.creative.name, creativeName11)
		.setValue(inputs.pages.blueprints.rfi.resultName, "Apple Page")
		.setValue(inputs.pages.blueprints.rfi.rfiName, "Apple Page 2")

		//save
		.click(inputs.save)
	},
	'test Email Entry models display (step 2: assert)' : function (browser) {
		browser
		.waitForElementVisible(containers.creativesListing, loadTime)

		//click new destination creative item in listing
		.useXpath()
		.click("//a[text()='" + creativeName11 + "']")
		.useCss()
		.waitForElementVisible(inputs.feature.name, loadTime)

		//assert Combination models show
		.waitForElementVisible(inputs.models.field, loadTime)

		.end();
	}

};
