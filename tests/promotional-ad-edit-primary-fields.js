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
	'create a second delivery group' : function (browser) {
		browser

		.url(deliveryGroupCreateUrl)

		.waitForElementVisible(deliveryGroupContainers.deliveryGroupEditForm, loadTime)

		//fill in form values
		.clearValue(deliveryGroupInputs.deliveryGroup.name)
		.setValue(deliveryGroupInputs.deliveryGroup.name, deliveryGroupName2)
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
	'create a second overlay promotional creative' : function (browser) {
		browser

		.url(promotionalCreativeCreateUrl)

		.waitForElementVisible(promoCreativeContainers.promotionalEditForm, loadTime)

		//fill in form values
		.setValue(promoCreativeInputs.creative.name, promoCreativeName2)
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
	'create a second destination creative' : function (browser) {
		browser

		.url(destinationCreativeCreateUrl)

		.waitForElementVisible(destinationCreativeContainers.destinationEditForm, loadTime)

		//fill in form values
		.setValue(destinationCreativeInputs.creative.name, destinationCreativeName2)

		.pause(1000)

		.click(destinationCreativeInputs.save)

		.waitForElementVisible(destinationCreativeContainers.creativesListing, loadTime)
	},
	'test creating an ad empty fields causes name validation error' : function (browser) {
		browser

		.url(adCreateUrl)
		.waitForElementVisible(adContainers.adEditForm, loadTime)
		.waitForElementVisible(adInputs.save, loadTime)
		.click(adInputs.save)

		.waitForElementVisible(adContainers.errors.validationSummary, loadTime)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.nameIsRequired)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.adTypeIsRequired)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.creativeIsRequired)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.platformIsRequired)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.placementIsRequired)
	},
	'test auto generate ad creates correct ad name' : function (browser) {
		browser

		.url(adCreateUrl)

		.waitForElementVisible(adContainers.adEditForm, loadTime)
		.waitForElementVisible(adInputs.ad.name, loadTime)

		//fill in form values
		.click(adInputs.adTypeSelect)
		.click(adInputs.ad.adTypes.overlay)
		.click(adInputs.platformSelect)
		.click(adInputs.ad.platforms.android)

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

		.click(adInputs.adNameGeneratorButton)

		.waitForElementVisible(adInputs.ad.name, loadTime)
		.assert.value(adInputs.ad.name, (promoCreativeName1 + '  (' + adInputs.platformNames.android + ' - ' + adInputs.placementNames.sambaFemaleInVideo + ')'))
	},
	'test creating a promotional ad saves' : function (browser) {
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

		.waitForElementVisible(adInputs.ad.coordinates.roku.sd.x, loadTime)
		.setValue(adInputs.ad.coordinates.roku.sd.x, 1)
		.setValue(adInputs.ad.coordinates.roku.sd.y, 2)
		.setValue(adInputs.ad.coordinates.roku.hd.x, 3)
		.setValue(adInputs.ad.coordinates.roku.hd.y, 4)

		.pause(1000)

		.click(adInputs.save)
	},
	'test created promotional ad has correct input values' : function (browser) {
		browser

		.waitForElementVisible(adContainers.adListing, loadTime)

		//click by text
		.useXpath()
		.click("//a[text()='" + adName1 + "']")
		.useCss()

		.waitForElementVisible(adInputs.ad.name, loadTime)

		.useXpath()
		.assert.visible("//span[text()='" + promoCreativeName1 + "']")
		.assert.visible("//span[text()='" + destinationCreativeName1 + "']")
		.assert.visible("//span[text()='" + deliveryGroupName1 + "']")
		.useCss()

		.assert.value(adInputs.ad.name, adName1)
		.assert.visible(adInputs.ad.adTypes.overlay)
		.assert.visible(adInputs.ad.platforms.roku)
		.assert.value(adInputs.ad.coordinates.roku.sd.x, "1")
		.assert.value(adInputs.ad.coordinates.roku.sd.y, "2")
		.assert.value(adInputs.ad.coordinates.roku.hd.x, "3")
		.assert.value(adInputs.ad.coordinates.roku.hd.y, "4")
	},
	'test editing promotional ad coordinates saves for Roku Platform' : function (browser) {
		browser

		.clearValue(adInputs.ad.coordinates.roku.sd.x)
		.setValue(adInputs.ad.coordinates.roku.sd.x, 11)
		.clearValue(adInputs.ad.coordinates.roku.sd.y)
		.setValue(adInputs.ad.coordinates.roku.sd.y, 22)
		.clearValue(adInputs.ad.coordinates.roku.hd.x)
		.setValue(adInputs.ad.coordinates.roku.hd.x, 33)
		.clearValue(adInputs.ad.coordinates.roku.hd.y)
		.setValue(adInputs.ad.coordinates.roku.hd.y, 44)

		.pause(1000)

		.click(adInputs.save)
	},
	'test edited promotional ad has correct coordinates input values for Roku Platform' : function (browser) {
		browser

		.waitForElementVisible(adContainers.adListing, loadTime)

		//click by text
		.useXpath()
		.click("//a[text()='" + adName1 + "']")
		.useCss()

		.waitForElementVisible(adInputs.ad.name, loadTime)
		//
		.assert.visible(adInputs.ad.platforms.roku)

		.assert.value(adInputs.ad.coordinates.roku.sd.x, "11")
		.assert.value(adInputs.ad.coordinates.roku.sd.y, "22")
		.assert.value(adInputs.ad.coordinates.roku.hd.x, "33")
		.assert.value(adInputs.ad.coordinates.roku.hd.y, "44")
	},
	'test editing promotional ad coordinates for Html5 Platform' : function (browser) {
		browser

		.click(adInputs.platformSelect)
		.click(adInputs.ad.platforms.android)

		.waitForElementVisible(adInputs.ad.coordinates.html5.hd.x, loadTime)
		.setValue(adInputs.ad.coordinates.html5.hd.x, 7)
		.setValue(adInputs.ad.coordinates.html5.hd.y, 8)

		.pause(1000)

		.click(adInputs.save)
	},
	'test promotional ad has correct coordinates input values for Html5 Platform' : function (browser) {
		browser

		.waitForElementVisible(adContainers.adListing, loadTime)

		//click by text
		.useXpath()
		.click("//a[text()='" + adName1 + "']")
		.useCss()

		.waitForElementVisible(adInputs.ad.name, loadTime)

		.assert.visible(adInputs.ad.platforms.android)
		.assert.value(adInputs.ad.coordinates.html5.hd.x, "7")
		.assert.value(adInputs.ad.coordinates.html5.hd.y, "8")
	},
	'test SD Coordinates inputs are hidden for selected Html5 platform' : function (browser) {
		browser
		.url(adCreateUrl)

		.waitForElementVisible(adContainers.adEditForm, loadTime)
		.waitForElementVisible(adInputs.platformSelect, loadTime)

		.click(adInputs.platformSelect)
		.click(adInputs.ad.platforms.android)

		.assert.hidden(adInputs.ad.coordinates.roku.sd.x)
		.assert.hidden(adInputs.ad.coordinates.roku.sd.y)
	},
	'test HD Coordinates inputs are visible for selected Html5 platform' : function (browser) {
		browser
		.url(adCreateUrl)

		.waitForElementVisible(adContainers.adEditForm, loadTime)
		.waitForElementVisible(adInputs.platformSelect, loadTime)

		.click(adInputs.platformSelect)
		.click(adInputs.ad.platforms.android)

		.assert.visible(adInputs.ad.coordinates.html5.hd.x)
		.assert.visible(adInputs.ad.coordinates.html5.hd.y)
	},
	'test HD and SD Coordinates inputs are visible for selected Roku platform' : function (browser) {
		browser
		.url(adCreateUrl)

		.waitForElementVisible(adContainers.adEditForm, loadTime)
		.waitForElementVisible(adInputs.platformSelect, loadTime)

		.click(adInputs.platformSelect)
		.click(adInputs.ad.platforms.roku)

		.assert.visible(adInputs.ad.coordinates.roku.hd.x)
		.assert.visible(adInputs.ad.coordinates.roku.hd.y)
		.assert.visible(adInputs.ad.coordinates.roku.sd.x)
		.assert.visible(adInputs.ad.coordinates.roku.sd.y)
	},
	'test max validations for SD/HD X/Y Coordinates input for selected Roku platform' : function (browser) {
		browser
		.url(adCreateUrl)

		.waitForElementVisible(adContainers.adEditForm, loadTime)
		.waitForElementVisible(adInputs.platformSelect, loadTime)

		.click(adInputs.platformSelect)
		.click(adInputs.ad.platforms.roku)

		.clearValue(adInputs.ad.coordinates.roku.hd.x)
		.setValue(adInputs.ad.coordinates.roku.hd.x, 11111)
		.clearValue(adInputs.ad.coordinates.roku.hd.y)
		.setValue(adInputs.ad.coordinates.roku.hd.y, 11111)
		.clearValue(adInputs.ad.coordinates.roku.sd.x)
		.setValue(adInputs.ad.coordinates.roku.sd.x, 11111)
		.clearValue(adInputs.ad.coordinates.roku.sd.y)
		.setValue(adInputs.ad.coordinates.roku.sd.y, 11111)

		.waitForElementVisible(adContainers.errors.validationSummary, loadTime)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.coordinates.roku.hd.x.max)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.coordinates.roku.hd.y.max)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.coordinates.roku.sd.x.max)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.coordinates.roku.sd.y.max)

	},
	'test max validations for HD X/Y Coordinates input for selected HTML5 platform' : function (browser) {
		browser
		.url(adCreateUrl)

		.waitForElementVisible(adContainers.adEditForm, loadTime)
		.waitForElementVisible(adInputs.platformSelect, loadTime)

		.click(adInputs.platformSelect)
		.click(adInputs.ad.platforms.android)

		.clearValue(adInputs.ad.coordinates.html5.hd.x)
		.setValue(adInputs.ad.coordinates.html5.hd.x, 11111)
		.clearValue(adInputs.ad.coordinates.html5.hd.y)
		.setValue(adInputs.ad.coordinates.html5.hd.y, 11111)

		.waitForElementVisible(adContainers.errors.validationSummary, loadTime)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.coordinates.html5.hd.x.max)
		.assert.containsText(adContainers.errors.validationSummary, adLabels.errors.coordinates.html5.hd.y.max)
	}
};
