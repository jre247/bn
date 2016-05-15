var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: false,
    reportsDirectory: 'C:/services/Nightwatch/reports_html'
});
module.exports = {
    reporter: reporter.fn
};
