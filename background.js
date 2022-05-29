chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    const newHeader = {name: 'Access-Control-Allow-Origin', value: '*'};
    const responseHeaders = details.responseHeaders.concat(newHeader);
    return { responseHeaders };
  },
  {
    urls: ["https://*.virtualox-sys.github.io/*", "https://pl.crunchyroll.com/*", "https://www.crunchyroll.com/*", "http://localhost/*"],
    types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
  },
  ["blocking","responseHeaders", "extraHeaders"]
)
