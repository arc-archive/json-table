declare function JsonTableMixin<T extends new (...args: any[]) => {}>(base: T): T & JsonTableMixinConstructor;

export {JsonTableMixinConstructor};
export {JsonTableMixin};

interface JsonTableMixinConstructor {
  new(...args: any[]): JsonTableMixin;
}

export declare interface ModelItem {
  /**
   * The roperty value - without applying data model. Thois will be done in child elements
   */
  value: any;
  /**
   * set if the value is type of array and contains primitives only
   */
  isEnum?: boolean;
  /**
   * set if the value is type of Object
   */
  isObject?: boolean;
  /**
   * set if the value is type of Array and contains complex objects
   */
  isArray?: boolean;
  /**
   * set if the value is type a primitive
   */
  isPrimitive?: boolean;
}

/**
 * Internal data model for a property.
 */
export declare interface PropertyModelItem extends ModelItem {
  /**
   * The property name
   */
  key: string;
}

declare interface JsonTableMixin {
  /**
   * In pagination, page index
   */
  page: number;
  /**
   * Number of items in pagination per page.
   * Allowed values are 10, 15, 20, 25, 50 and 100.
   */
  itemsPerPage: number;
  _oldItemsPerPage: number;
  /**
   * If true then the pagination will be enabled for the arrays.
   */
  paginate: boolean;
  /**
   * Enables outlined theme for inputs.
   */
  outlined: boolean;
  /**
   * Enables compatibility with Anypoint theme.
   */
  compatibility: boolean;

  /**
   * Returns true if given argument is an object.
   *
   * @param obj Candidate to test for object
   */
  isObject(obj: any): boolean;

  /**
   * Check if given object is one of the primitives.
   *
   * @param obj An object to test
   * @returns True if the object is one of:
   * - string
   * - number
   * - boolean
   * - undefined
   * - null
   */
  isPrimitive(obj: any): boolean;

  /**
   * Creates a data model for single proerty.
   *
   * @param key A property name in the JSON structure
   * @param value Value associated with the property.
   */
  getPropertyModel(key: string, value: any): PropertyModelItem;

  /**
   * Creates a model for a value.
   *
   * @param {any} value Array item or property value to create a model from.
   */
  getItemModel(value: any): ModelItem;

  /**
   * Checks if given array is enum (contains primitives only).
   *
   * @param arr An array to test.
   * @return True if the array contains primitive values only. False otherwise.
   */
  isEnum(arr: any[]): boolean;

  /**
   * Computes if the passed record's object is a type of array or enum.
   * @param item An item to test
   */
  _isEnumOrArray(item: ModelItem): boolean;

  /**
   * Computes the size of item's value.
   * @param item An array to test
   * @returns The size of the array.
   */
  _computeArraySize(item: ModelItem): number;
}
