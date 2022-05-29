const aseguir = document.getElementById('aseguir');
const cooldown = document.getElementById('cooldown');

aseguir.onchange = () => {
    chrome.storage.sync.set({'aseguir': aseguir.checked});
}

cooldown.onchange = () => {
    chrome.storage.sync.set({'cooldown': cooldown.value});
}

chrome.storage.sync.get(['aseguir', 'cooldown'], function(items) {
    if (items.aseguir === undefined) {
        chrome.storage.sync.set({'aseguir': true, 'cooldown': 5});
        aseguir.checked = true;
        cooldown.value = 5;
    } else {
        aseguir.checked = items.aseguir;
        cooldown.value = items.cooldown;
    }
});