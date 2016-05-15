exports.loginAsTester = function(browser, url){
    return browser
        .url(url)
        .waitForElementVisible('body', 1000)
        .setValue('#EmailAddress', 'uitester@mailinator.com')
        .setValue('#Password', 'Digital6!')
        .click('.btn-success');
};

exports.loginAsAgencyPartner = function(browser, url){
    return browser
        .url(url)
        .waitForElementVisible('body', 1000)
        .setValue('#EmailAddress', 'agency1@mailinator.com')
        .setValue('#Password', 'digital6')
        .click('.btn-success');
};

exports.loginAsEmployee = function(browser, url){
    return browser
        .url(url)
        .waitForElementVisible('body', 1000)
        .setValue('#EmailAddress', 'employee@mailinator.com')
        .setValue('#Password', 'digital6')
        .click('.btn-success');
};
