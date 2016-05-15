var helper = require('../utilities/helper.js');

module.exports = {
	inputs: {
		blueprintCreate: 'a[data-nw="blueprint-create"]',
		blueprint:{
			name: '#Name',
			manifestName: '#ManifestName',
			FeatureTypeGroups:{
				ContentPage: '#SelectedFeatureTypeGroup option[value="4"]'
			},
			FeatureTypes:{
				Interactive: '#SelectedFeatureType option[value="10015"]'
			},
			PreviewFile: '#Preview-file'
		},
		saveBlueprint: 'button[data-nw="save-blueprint"]'
	},
	ids:{

	},
	values:{
		blueprint: {
			name: 'Test Blueprint',
			manifestName: 'blueprint-test'
		}
	},
	containers:{
		successAlert: '.alert-success'
	}

}
