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
	'test Tracking Events saves correctly for new Ad' : function (browser) {
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

		.click(adInputs.adTrackingEventButton)
		.click(adInputs.trackingEventsSelect.rows[0])
		.click(adInputs.ad.trackingEvents.rows[0].close)
		.setValue(adInputs.ad.trackingUrls.rows[0], 'www.tracking1.com/track')

		.click(adInputs.adTrackingEventButton)
		.click(adInputs.trackingEventsSelect.rows[1])
		.click(adInputs.ad.trackingEvents.rows[1].complete)
		.setValue(adInputs.ad.trackingUrls.rows[1], 'www.tracking2.com/track')

		.pause(1000)

		.click(adInputs.save)
	},
	'test created promotional ad has correct tracking event values' : function (browser) {
		browser

		.waitForElementVisible(adContainers.adListing, loadTime)

		//click by text
		.useXpath()
		.click("//a[text()='" + adName1 + "']")
		.useCss()

		.waitForElementVisible(adInputs.ad.name, loadTime)

		.assert.visible(adInputs.ad.trackingEvents.rows[0].close)
		.assert.visible(adInputs.ad.trackingEvents.rows[1].complete)
		.assert.value(adInputs.ad.trackingUrls.rows[0], "www.tracking1.com/track")
		.assert.value(adInputs.ad.trackingUrls.rows[1], "www.tracking2.com/track")
	},
	'test creating a third Tracking Event for a promotional ad saves correctly' : function (browser) {
		browser

		.waitForElementVisible(adInputs.ad.name, loadTime)

		.click(adInputs.adTrackingEventButton)
		.click(adInputs.trackingEventsSelect.rows[2])
		.click(adInputs.ad.trackingEvents.rows[2].firstQuartile)
		.setValue(adInputs.ad.trackingUrls.rows[2], 'www.tracking3.com/track')

		.click(adInputs.save)
	},
	'test promotional ad has correct tracking event values' : function (browser) {
		browser

		.waitForElementVisible(adContainers.adListing, loadTime)

		//click by text
		.useXpath()
		.click("//a[text()='" + adName1 + "']")
		.useCss()

		.waitForElementVisible(adInputs.ad.name, loadTime)

		.assert.visible(adInputs.ad.trackingEvents.rows[0].close)
		.assert.visible(adInputs.ad.trackingEvents.rows[1].complete)
		.assert.visible(adInputs.ad.trackingEvents.rows[2].firstQuartile)
		.assert.value(adInputs.ad.trackingUrls.rows[0], "www.tracking1.com/track")
		.assert.value(adInputs.ad.trackingUrls.rows[1], "www.tracking2.com/track")
		.assert.value(adInputs.ad.trackingUrls.rows[2], "www.tracking3.com/track")
	},
	'test promotional ad delete tracking event removes tracking event row' : function (browser) {
		browser

		.waitForElementVisible(adInputs.ad.name, loadTime)

		.click(adInputs.trackingEventRemoveButton.rows[2])
		.assert.elementNotPresent(adInputs.ad.trackingEvents.rows[2].firstQuartile)
		.assert.elementNotPresent(adInputs.ad.trackingUrls.rows[2])

		.click(adInputs.save)
	},
	'test promotional ad delete tracking event removed tracking event row' : function (browser) {
		browser

		.waitForElementVisible(adContainers.adListing, loadTime)

		//click by text
		.useXpath()
		.click("//a[text()='" + adName1 + "']")
		.useCss()

		.waitForElementVisible(adInputs.ad.name, loadTime)

		.assert.elementNotPresent(adInputs.ad.trackingEvents.rows[2].firstQuartile)
		.assert.elementNotPresent(adInputs.ad.trackingUrls.rows[2])
	}

};
