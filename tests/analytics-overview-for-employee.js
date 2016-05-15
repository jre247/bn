var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var loadTime = config.loadTime();
var analyticsElements = require('../elements/analytics-overview.js');
var inputs = analyticsElements.inputs;
var containers = analyticsElements.containers;
var labels = analyticsElements.labels;
var ids = analyticsElements.ids;

var validationSummary = '.validation-summary-errors';
var campaignSummaryUrl;
var launchUrl;

module.exports = {
	before : function(browser) {
		console.log('Setting up Analytics Overview For Agency Partner Tests...');
		var campaignId = 226063;
		campaignSummaryUrl = browser.launch_url + 'campaigns/' + campaignId + '/summary';

		console.log('inputs.navPillars.overview: ' + inputs.navPillars.overview);

		//login
		launchUrl = browser.launch_url;
		loginService.loginAsEmployee(browser, launchUrl)
  },
   'test all 3 nav pillars are visible on analytics overview page' : function (browser) {
			browser
			.url(campaignSummaryUrl)

			.waitForElementVisible(inputs.analytics, loadTime)
			.click(inputs.analytics)

			//assert only overview nav pillar is visible
			.waitForElementVisible(inputs.navPillars.overview, loadTime)
			.assert.visible(inputs.navPillars.promotionalDetail)
			
			// *Note: for now not testing if content detail tab are visible per BL-320 in Jira
		//	.assert.visible(inputs.navPillars.contentDetail)

	},
	'test metric1 and metric 2 filters are visible' : function (browser) {
		 browser

		 //first assert both filter metric selectors are visible
		 .assert.visible(inputs.metric1FilterSelector)
		 .assert.visible(inputs.metric2FilterSelector)
 },
	'test metric1 filter has Total Sessions selected and metric2 filter has Avg Time Spent selected as a default' : function (browser) {
		browser

		.assert.visible(inputs.metric1FilterSelectorOptions.metrics.totalSessions)
		.assert.visible(inputs.metric2FilterSelectorOptions.metrics.avgTimeSpent)
 },
 'test metric1 filter has correct available metrics' : function (browser) {
		browser

		.click(inputs.metric1FilterSelector)
		.waitForElementVisible(inputs.metric1FilterSelectorOptions.metrics.spotImpressions, loadTime)

		.assert.visible(inputs.metric1FilterSelectorOptions.metrics.spotImpressions)
		.assert.visible(inputs.metric1FilterSelectorOptions.metrics.intImpressions)
		.assert.visible(inputs.metric1FilterSelectorOptions.metrics.totalClicks)
		.assert.visible(inputs.metric1FilterSelectorOptions.metrics.CTR)

		// *Note: not checking for the below commented out metrics per BL-320-BL-325 in Jira
		//.assert.visible(inputs.metric1FilterSelectorOptions.metrics.totalVideoViews)
		//.assert.visible(inputs.metric1FilterSelectorOptions.metrics.avgVideoViewsPerSession)
		//.assert.visible(inputs.metric1FilterSelectorOptions.metrics.totalPageViews)
		//.assert.visible(inputs.metric1FilterSelectorOptions.metrics.avgPageViewsPerSession)
		//.assert.visible(inputs.metric1FilterSelectorOptions.metrics.avgPageViewsDuration)
},
'test metric2 filter has correct available metrics' : function (browser) {
	 browser

	 .click(inputs.metric2FilterSelector)
	 .waitForElementVisible(inputs.metric2FilterSelectorOptions.metrics.spotImpressions, loadTime)

	 .assert.visible(inputs.metric2FilterSelectorOptions.metrics.spotImpressions)
	 .assert.visible(inputs.metric2FilterSelectorOptions.metrics.intImpressions)
	 .assert.visible(inputs.metric2FilterSelectorOptions.metrics.totalClicks)
	 .assert.visible(inputs.metric2FilterSelectorOptions.metrics.CTR)

	 // *Note: not checking for the below commented out metrics per BL-320-BL-325 in Jira
	//  .assert.visible(inputs.metric2FilterSelectorOptions.metrics.totalVideoViews)
	//  .assert.visible(inputs.metric2FilterSelectorOptions.metrics.avgVideoViewsPerSession)
	//  .assert.visible(inputs.metric2FilterSelectorOptions.metrics.totalPageViews)
	//  .assert.visible(inputs.metric2FilterSelectorOptions.metrics.avgPageViewsPerSession)
	//  .assert.visible(inputs.metric2FilterSelectorOptions.metrics.avgPageViewsDuration)
},
'test table has correct columns' : function (browser) {
	 browser

	 .waitForElementVisible(containers.table.header.columns.intImpressions, loadTime)

	 .assert.visible(containers.table.header.columns.intImpressions)
	 .assert.visible(containers.table.header.columns.clicks)
	 .assert.visible(containers.table.header.columns.CTR)
	 .assert.visible(containers.table.header.columns.timeSpent)
	 .assert.visible(containers.table.header.columns.spotImpressions)
	 .assert.visible(containers.table.header.columns.sessions)

	 // *Note: not checking for the below commented out metrics per BL-320-BL-325 in Jira
	// .assert.visible(containers.table.header.columns.videoViews)
	// .assert.visible(containers.table.header.columns.pageViews)

	 .end();
	}

};
