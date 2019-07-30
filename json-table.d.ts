/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   json-table.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {LitElement, html, css} from 'lit-element';

import {JsonTableMixin} from './json-table-mixin.js';

declare namespace UiElements {

  /**
   * A table view from the JSON structure.
   *
   * The element renders a table and / or list view from a JSON object.
   * If JSON is an array it renders a table view. For objects it renders a list view.
   *
   * Complex object are represented as an embedded view of a list or table inside the parent object
   * representation. That may create very complex structure and lead to performance issues when computing
   * data model and building the DOM. Therefore the element will only build the first level of the view.
   * If the object / array contains other objects / arrays it will show only a button to display embeded
   * objects. That should prohibit from freezing the UI while rendering the view.
   *
   * Another optimization is pagination (disabled by default). After setting the `paginate` property
   * array tables will contain a pagination with `itemsPerPage` items rendered at a time. The user can
   * change number of items at any time.
   *
   * ### Example
   * ```html
   * <json-table json="[...]" paginate items-per-page="15"></json-table>
   * ```
   *
   * ## Content actions
   *
   * The element can render an actions pane above the table / list view. Action pane is to
   * display content actions that is relevant in context of the content displayed
   * below the buttons. It should be icon buttons list or just buttons added to this view.
   *
   * Buttons must have `slot="content-action"` attributte set to be included to this view.
   *
   * ```html
   * <json-table json='{"json": "test"}'>
   *  <paper-icon-button
   *    slot="content-action"
   *    title="Copy content to clipboard"
   *    icon="arc:content-copy"></paper-icon-button>
   * </json-table>
   * ```
   *
   * ### Styling
   *
   * `<json-table>` provides the following custom properties and mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--json-table` | Mixin applied to the element | `{}`
   * `--json-table-main-array-wrapper` | Mixin applied to the top level array's table view. This element has `overflow` property set.  | `{}`
   * `--json-table-item-border-bottom-color` | Color of the bottom border in the array able items or in the object list row | `rgba(0, 0, 0, 0.12)`
   * `--json-table-list-property-name-width` | Width of the property name for the list view for the object display | `120px`
   * `--json-table-array-header-color` | Color of the array table header labels | ``
   * `--json-table-array-body-color` | Color of the array table body values | ``
   */
  class JsonTable extends
    JsonTableMixin(
    Object) {

    /**
     * JSON data to display.
     * If provided data is type of string then it will use the `JSON.stringify` function to
     * create a JavaScript object from string.
     */
    json: any;

    /**
     * Will be set to true if the passed `json` is a string and it's not valid JSON.
     */
    readonly parserError: Boolean|null;

    /**
     * A copy of the `json` object so it can be altered by the element.
     */
    _renderJson: object|null|undefined;
    _parserError: boolean|null|undefined;
    render(): any;

    /**
     * Handler for `json` attribute value change.
     *
     * @param json JSON object to render.
     */
    _jsonChanged(json: object|any[]|null): void;

    /**
     * Sets `_renderJson` property after 1 ms.
     *
     * @param json JSON object to render.
     */
    _setRenderJson(json: object|any[]|null): void;
  }
}

declare global {

  interface HTMLElementTagNameMap {
    "json-table": UiElements.JsonTable;
  }
}
