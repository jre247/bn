module.exports = {
	inputs: {
		destinationCreativeListingNewItem: ".updated .col-name a",
		addFeature: '#add-feature',
		feature: {
			name: 'input[name="featureName"]'
		},
		blueprints:{
			imageGallery: 'div[data-nw-optionid="19"]',
			information: 'div[data-nw-optionid="7"]',
			survey: 'div[data-nw-optionid="14"]',
			infoVideoGallery: 'div[data-nw-optionid="18"]',
			standAloneVideoGallery: 'div[data-nw-optionid="21"]',
			rfi: 'div[data-nw-optionid="10"]'
		},
		blueprintSelect: 'div[data-nw-fieldname="blueprint"] .Select-control',
		featureTypes: {
			combination: 'div[data-nw-optionid="10004"]',
			emailEntry: 'div[data-nw-optionid="10008"]',
			framed: 'div[data-nw-optionid="10017"]',
			image: 'div[data-nw-optionid="10002"]',
			indirect: 'div[data-nw-optionid="10022"]',
			questionaire: 'div[data-nw-optionid="10024"]',
			static: 'div[data-nw-optionid="10014"]',
			video: 'div[data-nw-optionid="10001"]',
		},
		models:{
			videoDescription: 'a[data-nw-modeldefinitionid="9"]',
			video: 'a[data-nw-modeldefinitionid="10"]',
			field: 'a[data-nw-modeldefinitionid="4"]',
			image: 'a[data-nw-modeldefinitionid="11"]'
		},
		creative:{
			name: 'input[name="name"]',
			description: 'input[name="description"]',
			thumbnail: '.resource-file',
			thumbnailName: '.resource-image-name',
			inactivityThreshold: 'div[data-nw-fieldname="inactivityThreshold"] input'
		},
		removeFeature: '.remove-feature',
		save: '.btn-success',
		pages:{
			blueprints:{
				imageGallery:{
					galleryName: 'div[data-nw-pagedefinitionid="11"] input'
				},
				survey:{
					intro: 'div[data-nw-pagedefinitionid="7"] input',
					exitName: 'div[data-nw-pagedefinitionid="8"] input',
					thankYou: 'div[data-nw-pagedefinitionid="9"] input',
				},
				fullScreenVideoPlayer:{
					videoName: 'div[data-nw-pagedefinitionid="17"] input'
				},
				rfi:{
					resultName: 'div[data-nw-pagedefinitionid="3"] input',
					rfiName: 'div[data-nw-pagedefinitionid="4"] input'
				},
				blueprintDiagnostic:{
					quizName: 'div[data-nw-pagedefinitionid="18"] input',
					resultName: 'div[data-nw-pagedefinitionid="19"] input'
				},
				information:{
					galleryName: 'div[data-nw-pagedefinitionid="6"] input'
				}		,
				infoVideoGallery:{
					galleryName: 'div[data-nw-pagedefinitionid="10"] input'
				}
			}
		},
		modelInstanceCreate: ".instance-create",
		modelInstance:{
			name: 'div[data-nw-fieldname="name"]'
		}
	},
	containers: {
		destinationEditForm: '#campaign-content-container',
		creativesListing: "#campaign-creatives",
		featureItem: '.feature-fields-and-models-listing-container',
		featureTypes:{
			combination: 'div[data-featuretype-id="10004"]',
			emailEntry: 'div[data-featuretype-id="10008"]',
			framed: 'div[data-featuretype-id="10017"]',
			image: 'div[data-featuretype-id="10002"]',
			indirect: 'div[data-featuretype-id="10022"]',
			questionaire: 'div[data-featuretype-id="10023"]',
			static: 'div[data-featuretype-id="10014"]',
			video: 'div[data-featuretype-id="10001"]',
		},
		resourceImage: '.resource-image-content',
		errors: {
			error: '.error',
			validationSummary: '.validation-summary'
		}
	},
	labels: {
		errors: {
			uniqueCreativeName: "Creative with the name '{0}' already exists. Please enter an unique name"
		}
	}
}
