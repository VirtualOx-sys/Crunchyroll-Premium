window.evidon_dg = {}

Object.defineProperty(window.evidon_dg, "evidonCriticalDomains", {
  get: function () { return ['wvc-x-callback:']; },
});
Object.defineProperty(window.evidon_dg, "productNames", {
  get: function () { return {}; },
});
Object.defineProperty(window.evidon_dg, "loadedProducts", {
  get: function () { return []; },
});
Object.defineProperty(window.evidon_dg, "productIds", {
  get: function () { return []; },
});

console.log("[CR XHR] Configurando interceptor...")
var rawOpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.open = function () {
  if (!this._hooked) {
    this._hooked = true;
    setupHook(this);
  }
  rawOpen.apply(this, arguments);
}

function setupHook(xhr) {
  let toggle = false;
  function getter() {
    delete xhr.responseText;
    var ret = xhr.responseText;
    try {
      if (toggle = !toggle) handleIntercept(JSON.parse(ret));
    } catch (e) { }
    setup();
    return ret;
  }

  function setup() {
    Object.defineProperty(xhr, 'responseText', {
      get: getter,
      configurable: true
    });
  }
  setup();
}

const verbose = false;
// Intercepta la respuesta de las solicitudes (red)
function handleIntercept(jsonResponse) {
  if (verbose) console.log("[CR XHR]", jsonResponse);

  // Guarde ID externos de paneles en localStorage
  if (jsonResponse.items) jsonResponse.items.forEach(item => {
    if (item.id && item.external_id) {
      console.log("[CR XHR] Panel encontrado:", item);
      storeExternalId(item.id, item.external_id)
    }
  })
}

function storeExternalId(id, external_id) {
  let externalIds = localStorage.getItem('externalIds');
  if (externalIds) externalIds = JSON.parse(externalIds)
  else externalIds = {};
  externalIds[id] = external_id;
  localStorage.setItem('externalIds', JSON.stringify(externalIds));
}