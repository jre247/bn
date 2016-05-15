module.exports = {
	inputs: {
		channelSelect: 'div[data-nw-fieldname="mediapartner"] .Select-control',
		deliveryGroup:{
      name: 'div[data-nw-fieldname="name"] input',
			channels:{
				abc: 'div[data-nw-optionid="1"]',
				abcFamily: 'div[data-nw-optionid="2"]',
				samba: 'div[data-nw-optionid="49"]'
			},
			promotionalGoal: 'input[name="impressionGoal"]',
			mediaSpend: 'input[name="mediaSpend"]'
		},
    save: '.save'
	},
	ids:{

	},
	values:{

	},
  containers: {
		errors: {
			error: '.error',
			validationSummary: '.validation-summary'
		},
    deliveryGroupEditForm: '#campaign-content-container',
		deliveryGroupListing: "#campaign-deliverygroups"
	},
	labels: {
		errors: {
			nameIsRequired: "Name is required"
		}
	}
}
