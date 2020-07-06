import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
import '@anypoint-web-components/anypoint-dropdown-menu/anypoint-dropdown-menu.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@anypoint-web-components/anypoint-input/anypoint-textarea.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '../json-table.js';

let customJson;
function addToast(text) {
  const toast = document.createElement('paper-toast');
  toast.text = text;
  toast.opened = true;
  document.body.appendChild(toast);
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    addToast('Unable to download JSON data.');
    return;
  }
  try {
    const json = await response.json();
    document.querySelector('json-table').json = json;
  } catch (e) {
    addToast(e.message);
  }

}

document.getElementById('listbox').addEventListener('select', (e) => {
  // @ts-ignore
  const file = e.detail.item.dataset.example;
  if (file) {
    getJson(file);
  } else {
    // @ts-ignore
    document.getElementById('inputDialog').opened = true;
  }
});

document.getElementById('inputDialog').addEventListener('iron-overlay-closed', (e) => {
  // @ts-ignore
  if (e.detail.confirmed) {
    document.querySelector('json-table').json = customJson;
  }
  document.querySelector('anypoint-listbox').selected = -1;
});

document.getElementById('txt').addEventListener('input', (e) => {
  // @ts-ignore
  customJson = e.target.value;
});
