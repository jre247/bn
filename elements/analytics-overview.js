module.exports = {
	inputs: {
		analytics: 'a[title="Analytics"]',
    navPillars: {
      overview: 'li[data-nw="Overview"]',
      contentDetail: 'li[data-nw="Content Detail"]',
      promotionalDetail: 'li[data-nw="Promotional Detail"]',
    },
    metric1FilterSelector: 'div[data-nw="m1-filter-selector"]',
    metric2FilterSelector: 'div[data-nw="m2-filter-selector"]',
    metric1FilterSelectorOptions: {
      metrics:{
        CTR: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="3"]',
        avgTimeSpent: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="5"]',
        intImpressions: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="16"]',
        totalClicks: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="2"]',
        totalSessions: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="4"]',
        spotImpressions: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="21"]',
        totalVideoViews: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="9"]',
        avgVideoViewsPerSession: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="10"]',
        totalPageViews: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="11"]',
        avgPageViewsPerSession: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="12"]',
        avgPageViewsDuration: 'div[data-nw="m1-filter-selector"] div[data-nw-optionid="15"]'
      }
    },
    metric2FilterSelectorOptions: {
      metrics:{
        CTR: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="3"]',
        avgTimeSpent: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="5"]',
        intImpressions: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="16"]',
        totalClicks: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="2"]',
        totalSessions: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="4"]',
        spotImpressions: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="21"]',
        totalVideoViews: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="9"]',
        avgVideoViewsPerSession: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="10"]',
        totalPageViews: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="11"]',
        avgPageViewsPerSession: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="12"]',
        avgPageViewsDuration: 'div[data-nw="m2-filter-selector"] div[data-nw-optionid="15"]'
      }
    }

	},
	ids:{

	},
	values:{

	},
  containers: {
    table:{
      header:{
        columns:{
          intImpressions: 'div[data-nw="Int. Imps."]',
          clicks: 'div[data-nw="Clicks"]',
          CTR: 'div[data-nw="CTR"]',
          timeSpent: 'div[data-nw="Time Spent"]',
          videoViews: 'div[data-nw="Video Views"]',
          videoCompletionRate: 'div[data-nw="Video Completion Rate"]',
          spotImpressions: 'div[data-nw="Spot Imps."]',
          sessions: 'div[data-nw="Sessions"]',
          videoViewsPerSession: 'div[data-nw="Video Views/Session"]',
          pageViews: 'div[data-nw="Pageviews"]',
          pageViewsPerSession: 'div[data-nw="Pageviews/Session"]',
        }
      }
    }
	},
	labels: {

	}
}
