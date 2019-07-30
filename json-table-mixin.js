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
/**
 * Common methods for `json-table` views
 * @param {Function} base
 * @return {Class}
 */
export const JsonTableMixin = (base) => class extends base {
  static get properties() {
    return {
      // In pagination, page index
      page: { type: Number },
      /**
       * Number of items in pagination per page.
       * Allowed values are 10, 15, 20, 25, 50 and 100.
       */
      itemsPerPage: { type: Number },
      _oldItemsPerPage: { type: Number, attribute: 'items-per-page' },
      // If true then the pagination will be enabled for the arrays.
      paginate: { type: Boolean }
    };
  }

  get _oldItemsPerPage() {
    return this.itemsPerPage;
  }

  set _oldItemsPerPage(value) {
    this.itemsPerPage = value;
  }


  constructor() {
    super();
    this.page = 0;
    this.itemsPerPage = 20;
    this.paginate = false;
  }

  /**
   * Returns true if given argument is an array
   *
   * @param {any} arr Candidate to test for object
   * @return {Boolean}
   */
  isArray(arr) {
    return arr instanceof Array;
  }
  /**
   * Returns true if given argument is an object.
   *
   * @param {any} obj Candidate to test for object
   * @return {Boolean}
   */
  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  /**
   * Check if given object is one of the primitives.
   *
   * @param {any} obj An object to test
   * @return True if the object is one of:
   * - string
   * - number
   * - boolean
   * - undefined
   * - null
   * @return {Boolean}
   */
  isPrimitive(obj) {
    if (obj === null) {
      return true;
    }
    const primitives = ['string', 'number', 'boolean', 'undefined'];
    const type = typeof obj;
    return primitives.indexOf(type) !== -1;
  }

  /**
   * Creates a data model for single proerty.
   *
   * @param {String} key A property name in the JSON structure
   * @param {any} value Value associated with the property.
   * @return {Object<String, any>} Internal data model for a property. Model contains following
   * keys:
   *
   * - key - a property name
   * - value - property value - without applying data model. Thois will be done in child elements
   * - isObject - set if the value is type of Object
   * - isEnum - set if the value is type of array and contains primitives only
   * - isArray - set if the value is type of Array and contains complex objects
   * - isPrimitive - set if the value is type a primitive
   */
  getPropertyModel(key, value) {
    const result = this.getItemModel(value);
    result.key = key;
    return result;
  }
  /**
   * Creates a model for a value.
   *
   * @param {any} value Array item or property value to create a model from.
   * @return {Object<String, any>} Internal data model for a property value or array item. Model
   * contains following keys:
   *
   * - value - property value - without applying data model. Thois will be done in child elements
   * - isObject - set if the value is type of Object
   * - isEnum - set if the value is type of array and contains primitives only
   * - isArray - set if the value is type of Array and contains complex objects
   * - isPrimitive - set if the value is type a primitive
   */
  getItemModel(value) {
    const result = {
      value: value
    };
    if (this.isObject(value)) {
      result.isObject = true;
    } else if (this.isArray(value)) {
      if (this.isEnum(value)) {
        result.isEnum = true;
      } else {
        result.isArray = true;
      }
    } else {
      result.isPrimitive = true;
    }
    return result;
  }
  /**
   * Checks if given array is enum (contains primitives only).
   *
   * @param {Array} arr An array to test.
   * @return {Boolean} True if the array contains primitive values only. False otherwise.
   */
  isEnum(arr) {
    if (!arr || !arr.length) {
      return false;
    }
    for (let i = 0, len = arr.length; i < len; i++) {
      if (!this.isPrimitive(arr[i])) {
        return false;
      }
    }
    return true;
  }
  // Computes if the passed record's object is a type of array or enum.
  _isEnumOrArray(item) {
    if (!item) {
      return false;
    }
    return item.isArray || item.isEnum;
  }
  // Computes the size of item's value.
  _computeArraySize(item) {
    if (!item) {
      return 0;
    }
    if (item.isArray || item.isEnum) {
      return item.value.length || 0;
    }
    return 0;
  }
};
