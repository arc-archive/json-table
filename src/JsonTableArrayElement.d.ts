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
import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import { JsonTableMixin, ModelItem } from './JsonTableMixin.js';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */

/**
 * An element that displays array structure.
 *
 * ### Example
 *
 * ```html
 * <json-table-array json="[...]"></json-table-array>
 * ```
 */
export class JsonTableArrayElement extends JsonTableMixin(LitElement) {
  get styles(): CSSResult;
  json?: any[];
  columns?: string[];
  /**
   * @attribute
   */
  paginate: boolean;
  /**
   * @attribute
   */
  page: number;
  /**
   * @attribute
   */
  itemsPerPage: number;

  _display?: ModelItem[];
  _columns?: string[];
  _startItemLabel: number;
  _endItemLabel: number;
  _maxItemsLabel: number;

  render(): TemplateResult;
  _paginationTemplate(): TemplateResult;
  _displayTemplate(display: ModelItem[], hasColumns: boolean, columns: string[]): TemplateResult;


  /**
   * Creates a data model from the `json` property.
   *
   * TODO: This should be a deep data observer to update only the portion of the model that
   * actually has changed.
   */
  _jsonChanged(json: any[]): void;

  _computeDisplay(): void;

  /**
   * Computes the list of column names for the table.
   * It will contain all properties keys fond in the array.
   * @param {} json
   * @return {string[]|null}
   */
  _computeColumns(json: any[]): string[]|null;

  /**
   * Checks if passed `item` has value that is a primitive.
   */
  _isPrimitive(item: ModelItem, column: string): boolean;

  /**
   * Checks if passed `item` has value that is an object.
   */
  _isObject(item: ModelItem, column: string): boolean;

  /**
   * Checks if passed `item` has value that is an enum.
   */
  _isEnum(item: ModelItem, column: string): boolean;

  /**
   * Checks if passed `item` has value that is an array.
   */
  _isArray(item: ModelItem, column: string): boolean;

  _getValue(item: ModelItem, column: string): any;

  _toggleItem(e: PointerEvent): void;

  /**
   * When pagination is enabled this will increase page number.
   * This will do nothing if pagination isn't enabled or there's no next page of results to
   * display.
   */
  nextPage(): boolean;

  /**
   * When pagination is enabled this will decrease page number.
   * This will do nothing if pagination isn't enabled or there's no previous page of results to
   * display.
   */
  previousPage(): void;

  /**
   * Computes if the previous page button for the pagination should be disabled.
   *
   * @param page Current page index
   * @returns true if there's previous page of the results
   */
  _isDisabledPrevious(page: number): boolean;

  _isDisabledNext(maxItemsLabel: number, endItemLabel: number): boolean;

  _computeValueSize(item: ModelItem, column: string): number;

  _ippHandler(e: CustomEvent): void;
}
