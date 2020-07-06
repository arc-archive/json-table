import { dedupeMixin } from '@open-wc/dedupe-mixin';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */

/** @typedef {import('./JsonTableMixin').PropertyModelItem} PropertyModelItem */
/** @typedef {import('./JsonTableMixin').ModelItem} ModelItem */

/**
 * @param {typeof HTMLElement} base
 */
const mxFunction = (base) => {
  class JsonTableMixinImpl extends base {
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
        paginate: { type: Boolean },
        /**
         * Enables outlined theme for inputs.
         */
        outlined: { type: Boolean, reflect: true },
        /**
         * Enables compatibility with Anypoint theme.
         */
        compatibility: { type: Boolean, reflect: true }
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
     * Returns true if given argument is an object.
     *
     * @param {any} obj Candidate to test for object
     * @return {boolean}
     */
    isObject(obj) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    }

    /**
     * Check if given object is one of the primitives.
     *
     * @param {any} obj An object to test
     * @return {boolean} True if the object is one of:
     * - string
     * - number
     * - boolean
     * - undefined
     * - null
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
     * @param {string} key A property name in the JSON structure
     * @param {any} value Value associated with the property.
     * @return {PropertyModelItem}  Model contains following
     */
    getPropertyModel(key, value) {
      const result = /** @type PropertyModelItem */ (this.getItemModel(value));
      result.key = key;
      return result;
    }

    /**
     * Creates a model for a value.
     *
     * @param {any} value Array item or property value to create a model from.
     * @return {ModelItem} Internal data model for a property value or array item. Model
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
        value,
      };
      if (this.isObject(value)) {
        result.isObject = true;
      } else if (Array.isArray(value)) {
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
     * @param {any[]} arr An array to test.
     * @return {boolean} True if the array contains primitive values only. False otherwise.
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

    /**
     * Computes if the passed record's object is a type of array or enum.
     * @param {ModelItem} item An item to test
     * @return {boolean}
     */
    _isEnumOrArray(item) {
      if (!item) {
        return false;
      }
      return item.isArray || item.isEnum;
    }

    /**
     * Computes the size of item's value.
     * @param {ModelItem} item An array to test
     * @return {number} The size of the array.
     */
    _computeArraySize(item) {
      if (!item) {
        return 0;
      }
      if (item.isArray || item.isEnum) {
        return item.value.length || 0;
      }
      return 0;
    }
  }
  return JsonTableMixinImpl;
};

/**
 * Common methods for `json-table` views
 * @mixin
 */
export const JsonTableMixin = dedupeMixin(mxFunction);
