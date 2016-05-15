# nightwatch

1) Install Nightwatch on your computer by running the following command in cmd or terminal:
npm install nightwatch -g

2) Git clone the Brightline Nightwatch repo into this directory on your computer:
C:/services/Nightwatch

Or

You can customize a root directory for Nightwatch to run/report in by modifying the path above in the following files:
  A) nightwatch.json:
    -modify the following properties in this file:
      a) selenium/server_path
      b) selenium/cli_args/webdriver.chrome.driver
  B) globals.js:
    -modify the following properties in this fil:
      a) reporter/reportsDirectory

3) Run the following command in the root directory of this project:
"nightwatch"

Nightwatch will then take 10-20 minutes to run all of the tests and will output all of the results to the following location:
"\reports_html\report.html"

You can find all of the Nightwatch defined tests in the following location:

"\tests"

You can find all the Nightwatch defined tests that will not run in the following location:

"\testsNotToRun"
