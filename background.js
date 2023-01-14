chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    fetch(request.url, request.options)
        .then(async response => {
            sendResponse({ result: await response.text() });
        })
        .catch(error => sendResponse({ error: error }));
    return true;
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        details.requestHeaders = details.requestHeaders.filter(header => header.name.toLowerCase() !== 'origin');
        return {
            requestHeaders: details.requestHeaders
        };
    },
    {
        urls: ['https://*.vrv.co/*', 'https://pl.crunchyroll.com/*']
    },
    ['blocking', 'requestHeaders', 'extraHeaders']
);

chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        details.responseHeaders.push({
            'name': 'Access-Control-Allow-Origin',
            'value': '*'
        });
        return { responseHeaders: details.responseHeaders };
    },
    {
        urls: ['https://*.vrv.co/*', 'https://pl.crunchyroll.com/*']
    },
    ['blocking', 'responseHeaders']
);