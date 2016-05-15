var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');

var adElements = require('../elements/ad.js');
var adInputs = adElements.inputs;
var adContainers = adElements.containers;
var adLabels = adElements.labels;
var adIds = adElements.ids;
var adCreateUrl = "";
var adListingUrl = "";
var adName1 = helper.guid();
var adName2 = helper.guid();

var adListingInputs = adElements.adListing.inputs;
var adListingContainers = adElements.adListing.containers;
var adListingLabels = adElements.adListing.labels;

var promoCreativeElements = require('../elements/promotional-creative.js');
var promoCreativeInputs = promoCreativeElements.inputs;
var promoCreativeContainers = promoCreativeElements.containers;
var promoCreativeLabels = promoCreativeElements.labels;
var promoCreativeIds = promoCreativeElements.ids;
var promoCreativeName1 = helper.guid();
var promoCreativeName2 = helper.guid();
var promotionalCreativeCreateUrl = "";

var destinationCreativeElements = require('../elements/destination-creative.js');
var destinationCreativeInputs = destinationCreativeElements.inputs;
var destinationCreativeContainers = destinationCreativeElements.containers;
var destinationCreativeLabels = destinationCreativeElements.labels;
var destinationCreativeIds = destinationCreativeElements.ids;
var destinationCreativeName1 = helper.guid();
var destinationCreativeName2 = helper.guid();
var destinationCreativeCreateUrl = "";

var deliveryGroupElements = require('../elements/delivery-group.js');
var deliveryGroupInputs = deliveryGroupElements.inputs;
var deliveryGroupContainers = deliveryGroupElements.containers;
var deliveryGroupLabels = deliveryGroupElements.labels;
var deliveryGroupIds = deliveryGroupElements.ids;
var deliveryGroupName1 = helper.guid();
var deliveryGroupName2 = helper.guid();
var deliveryGroupCreateUrl = "";

var creativeListingUrl = "";

var loadTime = config.loadTime();
var campaignId = 242;


module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		adCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/ads/create"
		adListingUrl = browser.launch_url + "campaigns/" + campaignId + "/ads";

		promotionalCreativeCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives/promotionals/create";
		destinationCreativeCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives/destinations/create";
		creativeListingUrl = browser.launch_url + "campaigns/" + campaignId + "/creatives";
		deliveryGroupCreateUrl = browser.launch_url + "campaigns/" + campaignId + "/deliverygroups/create";
		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl);
  },
	// Setup Step 1: Create a delivery group
	'create a delivery group' : function (browser) {
		browser

		.url(deliveryGroupCreateUrl)

		.waitForElementVisible(deliveryGroupInputs.deliveryGroup.name, loadTime)

		//fill in form values
		.setValue(deliveryGroupInputs.deliveryGroup.name, deliveryGroupName1)
		.click(deliveryGroupInputs.channelSelect)
		.click(deliveryGroupInputs.deliveryGroup.channels.samba)

		.pause(1000)

		.click(destinationCreativeInputs.save)

		.waitForElementVisible(deliveryGroupContainers.deliveryGroupListing, loadTime)
	},
	// Setup 2: Create an overlay promotional creative
	'create an overlay promotional creative' : function (browser) {
		browser

		.url(promotionalCreativeCreateUrl)

		.waitForElementVisible(promoCreativeContainers.promotionalEditForm, loadTime)

		//fill in form values
		.setValue(promoCreativeInputs.creative.name, promoCreativeName1)
		.setValue(promoCreativeInputs.creative.description, "blahz")
		.click(promoCreativeInputs.adTypesSelect)
		.click(promoCreativeInputs.adTypes.overlay)
		.click(promoCreativeInputs.adFormatSelect)
		.click(promoCreativeInputs.adFormats.channelGuide)

		.pause(1000)

		.click(promoCreativeInputs.save)

		.waitForElementVisible(promoCreativeContainers.creativesListing, loadTime)
	},
	// Setup 3: Create a destination creative
	'create a destination creative' : function (browser) {
		browser

		.url(destinationCreativeCreateUrl)

		.waitForElementVisible(destinationCreativeContainers.destinationEditForm, loadTime)

		//fill in form values
		.setValue(destinationCreativeInputs.creative.name, destinationCreativeName1)

		.pause(1000)

		.click(destinationCreativeInputs.save)

		.waitForElementVisible(destinationCreativeContainers.creativesListing, loadTime)
	},
	// Setup 4: Create an ad
	'create an ad' : function (browser) {
		browser

		.url(adCreateUrl)

		.waitForElementVisible(adContainers.adEditForm, loadTime)
		.waitForElementVisible(adInputs.ad.name, loadTime)

		//fill in form values
		.setValue(adInputs.ad.name, adName1)
		.click(adInputs.adTypeSelect)
		.click(adInputs.ad.adTypes.overlay)
		.click(adInputs.platformSelect)
		.click(adInputs.ad.platforms.roku)

		//click on the promotional creative just created in the last setup
		.click(adInputs.creativeSelect)
		.useXpath()
		.click("//span[text()='" + promoCreativeName1 + "']")
		.useCss()

		//click on the destination creative just created in previous setup
		.click(adInputs.creativeDestinationSelect)
		.useXpath()
		.click("//span[text()='" + destinationCreativeName1 + "']")
		.useCss()

		//click on the delivery group just created in previous setup
		.click(adInputs.deliveryGroupSelect)
		.useXpath()
		.click("//span[text()='" + deliveryGroupName1 + "']")
		.useCss()

		.click(adInputs.placementSelect)
		.click(adInputs.ad.placements.sambaFemaleInVideo)

		.pause(1000)

		.click(adInputs.save)
	},
	'test delivery group filter works' : function (browser) {
		browser
		.waitForElementVisible(adListingInputs.filters.deliveryGroup, loadTime)

		.click(adListingInputs.filters.deliveryGroup)

		.waitForElementVisible(adListingLabels.filters.deliveryGroup.label + '-' + deliveryGroupName1, loadTime)

		// Assert Delivery Group name label is correct
		.assert.containsText(adListingLabels.filters.deliveryGroup.label + '-' + deliveryGroupName1, deliveryGroupName1)

		// Assert that the correct Delivery Group contains an expected Ad
		.assert.containsText(adListingContainers.groupings.deliveryGroup + '-' + deliveryGroupName1, adName1)

	},
	'test placement filter works' : function (browser) {
		browser

		.click(adListingInputs.filters.placement)

		.waitForElementVisible(adListingLabels.filters.placement.label + '-' +  adListingInputs.placements.sambaFemaleInVideo.nameFormatted, loadTime)

		// Assert Placement name label is correct
		.assert.containsText(adListingLabels.filters.placement.label + '-' +  adListingInputs.placements.sambaFemaleInVideo.nameFormatted, adListingInputs.placements.sambaFemaleInVideo.nameOriginal)

		// Assert that the correct Placement contains an expected Ad
		.assert.containsText(adListingContainers.groupings.placement + '-' +  adListingInputs.placements.sambaFemaleInVideo.nameFormatted, adName1)
	}


};
