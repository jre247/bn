module.exports = {
	inputs: {
    creativeSelect: 'div[data-nw-fieldname="creative"] .Select-control',
    adTypeSelect: 'div[data-nw-fieldname="adType"] .Select-control',
    platformSelect: 'div[data-nw-fieldname="platform"] .Select-control',
    placementSelect: 'div[data-nw-fieldname="placement"] .Select-control',
    deliveryGroupSelect: 'div[data-nw-fieldname="deliveryGroup"] .Select-control',
    creativeDestinationSelect: 'div[data-nw-fieldname="creativeDestination"] .Select-control',
		adNameGeneratorButton: 'a[data-nw="auto-generate-ad-name"]',
		adTrackingEventButton: 'button[data-nw="add-tracking-event-button"]',
		trackingEventsSelect: {
			rows:[
					'.tracking-events .field-group-row-0 div[data-nw-fieldname="trackingEvent"] .Select-control',
					'.tracking-events .field-group-row-1 div[data-nw-fieldname="trackingEvent"] .Select-control',
					'.tracking-events .field-group-row-2 div[data-nw-fieldname="trackingEvent"] .Select-control'
			]
		},
		trackingEventRemoveButton:{
			rows:[
				'.tracking-events .field-group-row-0 .remove-feature',
				'.tracking-events .field-group-row-1 .remove-feature',
				'.tracking-events .field-group-row-2 .remove-feature'
			]
		},
		platformNames:{
			android: 'Android'
		},
		placementNames:{
			sambaFemaleInVideo: 'Samba - Female In-Video'
		},
		ad:{
      adTypes: {
  			overlay: 'div[data-nw-optionid="10017"]'
  		},
      platforms:{
        android: 'div[data-nw-optionid="15"]',
        amazonFireTv: 'div[data-nw-optionid="28"]',
				roku: 'div[data-nw-optionid="25"]'
      },
			trackingEvents:{
				rows:[
					{
						close:  '.tracking-events .field-group-row-0 div[data-nw-optionid="16"]',
						complete:  '.tracking-events .field-group-row-0 div[data-nw-optionid="6"]',
						firstQuartile:  '.tracking-events .field-group-row-0 div[data-nw-optionid="3"]'
					},
				  {
						close:  '.tracking-events .field-group-row-1 div[data-nw-optionid="16"]',
						complete:  '.tracking-events .field-group-row-1 div[data-nw-optionid="6"]',
						firstQuartile:  '.tracking-events .field-group-row-1 div[data-nw-optionid="3"]'
					},
					{
						close:  '.tracking-events .field-group-row-2 div[data-nw-optionid="16"]',
						complete:  '.tracking-events .field-group-row-2 div[data-nw-optionid="6"]',
						firstQuartile:  '.tracking-events .field-group-row-2 div[data-nw-optionid="3"]'
					}
				]
			},
			trackingUrls:{
				rows:	[
					 '.tracking-events .field-group-row-0 div[data-nw-fieldname="trackingUrl"] input',
					 '.tracking-events .field-group-row-1 div[data-nw-fieldname="trackingUrl"] input',
					 '.tracking-events .field-group-row-2 div[data-nw-fieldname="trackingUrl"] input'
					]
			},
      placements:{
        aetnRunOfNetworkInVideo: 'div[data-nw-optionid="1044"]',
        aetnRunOfAppLifetimeInVideo: 'div[data-nw-optionid="1067"]',
				sambaFemaleInVideo: 'div[data-nw-optionid="1030"]'
      },
      name: 'input[name="name"]',
			coordinates:{
				roku: {
					sd:{
						x: 'div[data-nw-fieldname="xCoordinateRokuSd"] input',
						y: 'div[data-nw-fieldname="yCoordinateRokuSd"] input'
					},
					hd:{
						x: 'div[data-nw-fieldname="xCoordinateRokuHd"] input',
						y: 'div[data-nw-fieldname="yCoordinateRokuHd"] input'
					}
				},
				html5: {
					hd:{
						x: 'div[data-nw-fieldname="xCoordinateHtml5Hd"] input',
						y: 'div[data-nw-fieldname="yCoordinateHtml5Hd"] input'
					}
				}
			}
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
    adEditForm: '#campaign-content-container',
    adListing: '#campaign-ads'
	},
	labels: {
		errors: {
			nameIsRequired: "Name is required",
      adTypeIsRequired: "Ad Type is required",
      creativeIsRequired: "Creative is required",
      platformIsRequired: "Platform is required",
      placementIsRequired: "Placement is required",
			coordinates: {
				roku:{
					sd: {
						x: {
							max: 'X: cannot be greater than 720'
						},
						y: {
							max: 'Y: cannot be greater than 480'
						}
					},
					hd: {
						x: {
							max: 'X: cannot be greater than 1280'
						},
						y: {
							max: 'Y: cannot be greater than 720'
						}
					}
				},
				html5: {
					hd: {
						x: {
							max: 'X: cannot be greater than 1920'
						},
						y: {
							max: 'Y: cannot be greater than 1080'
						}
					}
				}
			}
		}
	},
	adListing: {
		inputs:{
			filters:{
				deliveryGroup: 'a[data-nw="delivery-groups-filter"]',
				placement: 'a[data-nw="placements-filter"]',
				allAds: 'a[data-nw="all-ads-filter"]'
			},
			placements:{
				sambaFemaleInVideo: {
					nameOriginal: 'Samba - Female In-Video',
					nameFormatted: 'Samba_-_Female_In-Video' // Added underscores instead of spaces so that the placement name can be referenced in a classname and be a valid classname
				}
			}
		},
		containers: {
			groupings: {
				deliveryGroup: '.deliverygroup-ads',
				placement: '.placement-ads'
			}
		},
		labels: {
			filters: {
				deliveryGroup: {
					label: '.deliverygroup-label'
				},
				placement: {
					label: '.placement-label'
				}
			}
		}
	}
}
