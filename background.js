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
        details.requestHeaders = details.requestHeaders.filter(header => header.name.toLowerCase() !== 'origin' && header.name.toLowerCase() !== 'referer');
        return {
            requestHeaders: details.requestHeaders
        };
    },
    {
        urls: ['*://virtualox-sys.github.io/*', '*://pl.crunchyroll.com/*', '*://localhost/*', '*://*.vrv.co/*', 'https://prod.gccrunchyroll.com/*', 'https://a-vrv.akamaized.net/*']
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
        urls: ['*://virtualox-sys.github.io/*', '*://*.crunchyroll.com/*', '*://localhost/*', '*://*.vrv.co/*', 'https://prod.gccrunchyroll.com/*', 'https://a-vrv.akamaized.net/*']
    },
    ['blocking', 'responseHeaders']
);