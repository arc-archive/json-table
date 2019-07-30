import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-button/paper-button.js';
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

document.getElementById('listbox').addEventListener('iron-select', (e) => {
  const file = e.detail.item.dataset.example;
  if (file) {
    getJson(file);
  } else {
    document.getElementById('inputDialog').opened = true;
  }
});

document.getElementById('inputDialog').addEventListener('iron-overlay-closed', (e) => {
  if (e.detail.confirmed) {
    document.querySelector('json-table').json = customJson;
  }
  document.querySelector('paper-listbox').selected = -1;
});

document.getElementById('txt').addEventListener('input', (e) => {
  customJson = e.target.value;
});
