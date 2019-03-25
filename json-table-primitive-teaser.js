/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import {FlattenedNodesObserver} from '../../@polymer/polymer/lib/utils/flattened-nodes-observer.js';

class JsonTablePrimitiveTeaser extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        margin: 4px 0;
      }

      :host([opened]) .primitive-wrapper {
        max-height: none;
      }

      .primitive-wrapper {
        max-height: var(--json-table-primitive-teaser-max-heigth, 160px);
        overflow: hidden;
        padding: 4px 0;
      }

      *[hidden] {
        display: none !important;
      }

      .toggle {
        font-size: inherit;
        color: inherit;
        margin-top: 12px;
        display: inline-block;
      }
    </style>
    <div class="primitive-wrapper" id="wrapper">
      <slot id="slot">
    </slot></div>
    <a href="#" class="toggle" hidden\$="[[!_isOverflow]]" on-tap="toggle">[[_computeToggleLabel(opened)]]</a>
`;
  }

  static get is() {
    return 'json-table-primitive-teaser';
  }

  static get properties() {
    return {
      // If true then the whole value will be visible.
      opened: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      // DOM change observer
      observer: {
        readOnly: true,
        type: Object
      },
      // if true then the content overflows the max height area.
      _isOverflow: {
        type: Boolean,
        value: false
      },
      // Container's max height when closed.
      maxHeight: {
        type: String,
        value: '160px',
        observer: '_maxHeightChanged'
      }
    };
  }

  constructor() {
    super();
    this._contentChanged = this._contentChanged.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    const observer = new FlattenedNodesObserver(this.$.slot, this._contentChanged);
    this._setObserver(observer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._observer) {
      this._observer.disconnect();
      this._setObserver(undefined);
    }
  }

  _contentChanged() {
    const oh = this.$.wrapper.offsetHeight; // current height
    const sh = this.$.wrapper.scrollHeight; // content height
    this._isOverflow = sh > oh;
  }

  toggle(e) {
    e.preventDefault();
    this.opened = !this.opened;
  }

  _computeToggleLabel(opened) {
    return opened ? 'show less' : 'show more';
  }

  _maxHeightChanged(maxHeight) {
    maxHeight = maxHeight || '160px';
    this.updateStyles({
      '--json-table-primitive-teaser-max-heigth': maxHeight
    });
  }
}
window.customElements.define(JsonTablePrimitiveTeaser.is, JsonTablePrimitiveTeaser);
