/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   json-table-primitive-teaser.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

declare class JsonTablePrimitiveTeaser extends PolymerElement {

  /**
   * If true then the whole value will be visible.
   */
  opened: boolean|null|undefined;

  /**
   * DOM change observer
   */
  readonly observer: object|null|undefined;

  /**
   * if true then the content overflows the max height area.
   */
  _isOverflow: boolean|null|undefined;

  /**
   * Container's max height when closed.
   */
  maxHeight: string|null|undefined;
  connectedCallback(): void;
  disconnectedCallback(): void;
  _contentChanged(): void;
  toggle(e: any): void;
  _computeToggleLabel(opened: any): any;
  _maxHeightChanged(maxHeight: any): void;
}

declare global {

  interface HTMLElementTagNameMap {
    "json-table-primitive-teaser": JsonTablePrimitiveTeaser;
  }
}

export {};
