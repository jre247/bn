module.exports = {
	inputs: {
		promotionalCreativeListingNewItem: ".updated .col-name a",
		adTypesSelect: 'div[data-nw-fieldname="adType"] .Select-control',
		adFunctionsSelect: 'div[data-nw-fieldname="adFunction"] .Select-control',
    adFormatSelect: 'div[data-nw-fieldname="adFormat"] .Select-control',
		disabledAdFormat: '.readonly div[data-nw-fieldname="adFormat"]',
		disabledAdType: '.readonly div[data-nw-fieldname="adType"]',
		adTypes: {
			animatedBanner: 'div[data-nw-optionid="10002"]',
			animatedRoadblock: 'div[data-nw-optionid="10008"]',
			overlay: 'div[data-nw-optionid="10017"]'
		},
		adFormats:{
			channelGuide: 'div[data-nw-optionid="15"]',
			fullScreen: 'div[data-nw-optionid="7"]'
		},
		adFunctions: {
			app: 'div[data-nw-optionid="5"]',
			onDemand: 'div[data-nw-optionid="6"]'
		},
		creative:{
			name: 'div[data-nw-fieldname="name"] input',
			description: 'div[data-nw-fieldname="description"] textarea',
			resourceName: '.resource-image-name'
		},
		save: '.btn-success',
		resources:{
			sd: 'div[data-nw-fieldname="resourceImageSD"] input[type="file"]',
			hd: 'div[data-nw-fieldname="resourceImageHD"] input[type="file"]',
			selectNewHd: 'div[data-nw-fieldname="resourceImageHD"] .select-new'
		}
	},
	containers: {
		promotionalEditForm:  '#campaign-content-container',
		creativesListing: "#campaign-creatives",
		errors: {
			validationSummary: '.validation-summary-container'
		},
		resourceImage: '.resource-image-content',
	},
	labels: {
		errors: {
			nameIsRequired: "Name is required",
			adTypeIsRequired: "Ad Type is required",
			adFunctionIsRequired: "Ad Function is required",
			adFormatIsRequired: "Ad Format is required",
			uniqueCreativeName: "Creative with the name '{0}' already exists. Please enter an unique name"
		}
	}
}
