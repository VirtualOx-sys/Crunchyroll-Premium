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
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Origin') {
                console.log('Origin: ' + details.requestHeaders[i].value);
                details.requestHeaders = details.requestHeaders.slice(i, 1);
            }
        }

        return {
            requestHeaders: details.requestHeaders
        };
    },
    {
        urls: ['*://v.vrv.co/*']
    },
    ['blocking', 'requestHeaders', 'extraHeaders']
);