module.exports = { 
	inputs: {
		modelInstance:{
			name: 'div[data-nw-fieldname="name"] input',
			resource: '.resource-file'
		},
		save: '.save',
		modelInstanceListingItem: '.feature-model-instance-listing-item a'
	},
	containers: {
		errors: {
			validationSummary: '.validation-summary'
		},
		resourceImage: '.resource-image-content',
	},	
	labels: {
		errors: {
			nameIsRequired: "Name is required",
		}
	}
}