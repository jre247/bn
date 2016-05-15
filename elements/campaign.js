module.exports = {
	inputs: {
		campaign: {
			name: '#Name',
			internal: '#Internal',
			mediaAgency: '#MediaAgency',
			creativeAgency: '#CreativeAgency',
			product: '#Product',
			googleAnalyticsIds: '#GoogleAnalyticsIds',
			campaignTypes: {
				enterprise: '#CampaignType_1',
				express: '#CampaignType_2'
			},
			mediaAgencies: {
				bbdo: '#MediaAgency option[value="1"]',
				caratDET: '#MediaAgency option[value="3"]'
			},
			creativeAgencies: {
				bbdo: '#CreativeAgency option[value="1"]',
				caratDET: '#CreativeAgency option[value="3"]'
			},
			products: {
				axeDeo: '#Product option[value="12"]',
				fiveHourEnergy: '#Product option[value="134"]'
			},
			resource: '#thumbnail-file',
			thumbnailName: '#thumbnailName'
		},
		save: '#submitBtn'
	},
	ids:{
		agencies:{
			bbdo: '1',
			caratDET: '3'
		},
		products:{
			axeDeo: '12',
			fiveHourEnergy: '134'
		}
	},
	containers: {
		errors: {
			error: '.error',
			validationSummary: '.validation-summary'
		},
		formPreview: '.form-preview'
	},
	labels: {
		errors: {
			nameIsRequired: 'Name is required.',
			mediaAgencyIsRequired: 'Media Agency must be selected.',
			creativeAgencyIsRequired: 'Creative Agency must be selected.',
			productIsRequired: 'Product must be selected.',
			campaignTypeIsRequired: 'Campaign type must be selected.',
		}
	}
}
