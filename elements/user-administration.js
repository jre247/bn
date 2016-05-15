var helper = require('../utilities/helper.js');
var emailValue1 = helper.guid() + '@brightline.tv';
var emailValue2 = helper.guid() + '@brightline.tv';
var emailValue3 = helper.guid() + '@brightline.tv';
var emailValue4 = helper.guid() + '@brightline.tv';

module.exports = {
	inputs: {
		newUser: 'a[data-entity="newUser"]',
		close: 'button[data-entity="close"]',
		email: 'input[data-entity="email"]',
		firstName: 'input[data-entity="firstName"]',
		lastName: 'input[data-entity="lastName"]',
		employee: 'input[data-entity="Employee"]',
		employeeSelected: 'input[data-entity="Employee"]:checked',
		admin: 'input[data-entity="Admin"]',
		agencyPartner: 'input[data-entity="Agency Partner"]',
		agencyPartnerSelected: 'input[data-entity="Agency Partner"]:checked',
		mediaPartner: 'input[data-entity="Media Partner"]',
		mediaPartnerSelected: 'input[data-entity="Media Partner"]:checked',
		client: 'input[data-entity="Client"]',
		clientSelected: 'input[data-entity="Client"]:checked',
		saveUser: 'button[data-entity="saveUser"]',
		editUser: 'div[data-email="' + emailValue1 + '"]',
		editUser2: 'div[data-email="' + emailValue2 + '"]',
		editUser3: 'div[data-email="' + emailValue3 + '"]',
		editUser4: 'div[data-email="' + emailValue4 + '"]',
		advertiserItem: 'select[data-entity="advertiser"] option[value="5"]',
		mediaAgencyItem: 'select[data-entity="mediaAgency"] option[value="1"]',
		mediaPartners: {
			abc: 'select[data-entity="mediaPartner"] option[value="1"]'
		},
		advertiserSelectlist: 'select[data-entity="advertiser"]',
		mediaAgencySelectlist: 'select[data-entity="mediaAgency"]',
		mediaPartnerSelectlist: 'select[data-entity="mediaPartner"]',
		internal: 'input[data-entity="internal"]',
		internalSelected: 'input[data-entity="internal"]:checked'
	},
	ids:{
		advertisers:{
			generalMotors: '5'
		},
		mediaAgencies:{
			bbdo: '1'
		},
		mediaPartners:{
			abc: '1'
		}
	},
	values:{
		emailValue1: emailValue1,
		emailValue2: emailValue2,
		emailValue3: emailValue3,
		emailValue4: emailValue4
	}

}
