var loginService = require('../utilities/login.js');
var config = require('../utilities/config.js');
var helper = require('../utilities/helper.js');

var blueprintsElements = require('../elements/blueprints.js');
var inputs = blueprintsElements.inputs;
var ids = blueprintsElements.ids;
var values = blueprintsElements.values;
var containers = blueprintsElements.containers;

var loadTime = config.loadTime();
var blueprintListUrl = "";
var blueprintDeleteUrl = "";
var resourceDirectory = config.getResourceDirectory();
var resource_i_162_114 = "";

module.exports = {
	before : function(browser) {
		console.log('Setting up...');
		blueprintListUrl = browser.launch_url + 'blueprints';
		blueprintDeleteUrl = browser.launch_url + 'blueprints/cascadedeleteblueprint?name=' + values.blueprint.manifestName;

		resource_i_162_114 = resourceDirectory + '/i-162-114.png';

		//login
		var launchUrl = browser.launch_url;
		loginService.loginAsTester(browser, launchUrl)
  },
	'Delete blueprint-test from database' : function (browser) {
		browser

		.url(blueprintDeleteUrl)
		.pause(2000)
	},
 'Test creating blueprint with the repo name as blueprint-test (Step 1: Arrange)' : function (browser) {
		browser

		.url(blueprintListUrl)

		.waitForElementVisible(inputs.blueprintCreate, loadTime)
		.click(inputs.blueprintCreate)

		.waitForElementVisible(inputs.blueprint.name, loadTime)
		.setValue(inputs.blueprint.name, values.blueprint.name)
		.setValue(inputs.blueprint.manifestName, values.blueprint.manifestName)
		.click(inputs.blueprint.FeatureTypeGroups.ContentPage)
		.waitForElementVisible(inputs.blueprint.FeatureTypes.Interactive, loadTime)
		.click(inputs.blueprint.FeatureTypes.Interactive)
		.setValue(inputs.blueprint.PreviewFile, resource_i_162_114)
		.click(inputs.saveBlueprint)
	},
	'Test creating blueprint with the repo name as blueprint-test (Step 2: Assert)' : function (browser) {
		browser

		.waitForElementVisible(containers.successAlert, loadTime)
	},
	'Delete new blueprint-test from database' : function (browser) {
		browser

		.url(blueprintDeleteUrl)

		.end();
	}
};
