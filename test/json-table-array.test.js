import { fixture, assert, nextFrame } from '@open-wc/testing';
import '../json-table-array.js';

/** @typedef {import('../').JsonTableArrayElement} JsonTableArrayElement */

describe('<json-table-array>', () => {
  /**
   * 
   * @returns {Promise<JsonTableArrayElement>}
   */
  async function basicFixture() {
    return fixture(`<json-table-array paginate></json-table-array>`);
  }

  describe('basic', () => {
    let element;
    let jsonData;

    before(async () => {
      const response = await fetch('/base/demo/example.json');
      jsonData = await response.json();
    });

    beforeEach(async () => {
      element = await basicFixture();
      element.json = Array.from(jsonData);
      await nextFrame();
    });

    it('columns property should be set', () => {
      assert.isArray(element._columns, 'columns property is an array');
      const columns = ['_id', 'index', 'guid', 'isActive', 'balance', 'picture', 'age',
        'eyeColor', 'name', 'company', 'email', 'phone', 'address', 'about', 'registered',
        'latitude', 'longitude', 'tags', 'range', 'friends', 'greeting', 'favoriteFruit'];
      assert.deepEqual(element._columns, columns, 'columns equals list of columns');
    });

    it('display property should be set', () => {
      assert.isArray(element._display, 'display is an array');
      // check just the first item for model check
      const item = element._display[0];
      assert.isTrue(item.isObject, 'item.isObject equals true');
    });

    it('startItemLabel should equal 1', () => {
      assert.equal(element._startItemLabel, 1);
    });

    it('_endItemLabel is set', () => {
      assert.equal(element._endItemLabel, 20);
    });

    it('maxItemsLabel should size of the JSON - 1', () => {
      assert.equal(element._maxItemsLabel, jsonData.length - 1);
    });

    it('nextPage renders the next page', () => {
      element.nextPage();
      assert.equal(element._startItemLabel, element.itemsPerPage + 1,
        'startItemLabel equals itemsPerPage + 1');
      const startIndex = 1 * element.itemsPerPage;

      assert.equal(element._endItemLabel, startIndex + element.itemsPerPage,
        'startItemLabel equals startIndex + itemsPerPage');
    });
  });

  describe('_jsonChanged()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Resets display when no value', () => {
      element._display = 'test';
      element._jsonChanged();
      assert.isUndefined(element._display);
    });

    it('Resets columns when no value', () => {
      element._columnet = ('test');
      element._jsonChanged();
      assert.isUndefined(element._columns);
    });

    it('Sets columns property', () => {
      const json = [{test: true}];
      element._jsonChanged(json);
      assert.deepEqual(element._columns, ['test']);
    });
  });

  describe('_computeDisplay()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Does nothing when no json', () => {
      element._computeDisplay();
      assert.isUndefined(element._display);
    });

    it('Does nothing when empty array', () => {
      element._computeDisplay([]);
      assert.isUndefined(element._display);
    });

    it('Resets paginate property', () => {
      element.paginate = true;
      element.page = 0;
      element.itemsPerPage = 10;
      element.json = [{}, {}, {}];
      element._computeDisplay();
      assert.isFalse(element.paginate);
    });
  });

  describe('_isPrimitive()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns falsew when no item', () => {
      const result = element._isPrimitive(undefined, 1);
      assert.isFalse(result);
    });

    it('Returns false when no value', () => {
      const result = element._isPrimitive({}, 1);
      assert.isFalse(result);
    });

    it('Returns false when no value', () => {
      const result = element._isPrimitive({}, 1);
      assert.isFalse(result);
    });

    it('Returns false when no column', () => {
      const result = element._isPrimitive({value: []});
      assert.isFalse(result);
    });

    it('Returns false when value is not primitive', () => {
      const result = element._isPrimitive({value: [{}]}, 0);
      assert.isFalse(result);
    });

    it('Returns true when value is primitive', () => {
      const result = element._isPrimitive({value: [false]}, 0);
      assert.isTrue(result);
    });
  });

  describe('_isObject()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns falsew when no item', () => {
      const result = element._isObject(undefined, 1);
      assert.isFalse(result);
    });

    it('Returns false when no value', () => {
      const result = element._isObject({}, 1);
      assert.isFalse(result);
    });

    it('Returns false when no value', () => {
      const result = element._isObject({}, 1);
      assert.isFalse(result);
    });

    it('Returns false when no column', () => {
      const result = element._isObject({value: []});
      assert.isFalse(result);
    });

    it('Returns false when value is not object', () => {
      const result = element._isObject({value: [[]]}, 0);
      assert.isFalse(result);
    });

    it('Returns true when value is object', () => {
      const result = element._isObject({value: [{}]}, 0);
      assert.isTrue(result);
    });
  });

  describe('_isEnum()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns false when no item', () => {
      const result = element._isEnum(undefined, 1);
      assert.isFalse(result);
    });

    it('Returns false when no value', () => {
      const result = element._isEnum({}, 1);
      assert.isFalse(result);
    });

    it('Returns false when no value', () => {
      const result = element._isEnum({}, 1);
      assert.isFalse(result);
    });

    it('Returns false when no column', () => {
      const result = element._isEnum({value: []});
      assert.isFalse(result);
    });

    it('Returns false when value is not enum', () => {
      const result = element._isEnum({value: [[true, {}]]}, 0);
      assert.isFalse(result);
    });

    it('Returns true when value is enum', () => {
      const result = element._isEnum({value: [[1, true]]}, 0);
      assert.isTrue(result);
    });
  });

  describe('_isArray()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns false when no item', () => {
      const result = element._isArray(undefined, 1);
      assert.isFalse(result);
    });

    it('Returns false when no value', () => {
      const result = element._isArray({}, 1);
      assert.isFalse(result);
    });

    it('Returns false when no value', () => {
      const result = element._isArray({}, 1);
      assert.isFalse(result);
    });

    it('Returns false when no column', () => {
      const result = element._isArray({value: []});
      assert.isFalse(result);
    });

    it('Returns false when value is not an array', () => {
      const result = element._isArray({value: [true]}, 0);
      assert.isFalse(result);
    });

    it('Returns true when value is enum', () => {
      const result = element._isArray({value: [[1, {}]]}, 0);
      assert.isTrue(result);
    });
  });

  describe('_getValue()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns undefined when no item', () => {
      const result = element._getValue(undefined, 1);
      assert.isUndefined(result);
    });

    it('Returns undefined when no value', () => {
      const result = element._getValue({}, 1);
      assert.isUndefined(result);
    });

    it('Returns undefined when no value', () => {
      const result = element._getValue({}, 1);
      assert.isUndefined(result);
    });

    it('Returns undefined when no column', () => {
      const result = element._getValue({value: []});
      assert.isUndefined(result);
    });

    it('Returns the value', () => {
      const result = element._getValue({value: ['test']}, 0);
      assert.equal(result, 'test');
    });
  });

  describe('previousPage()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
      element.page = 1;
    });

    it('Does nothing when no pagination', () => {
      element.paginate = false;
      element.previousPage();
      assert.equal(element.page, 1);
    });

    it('Updates page index', () => {
      element.paginate = true;
      element.previousPage();
      assert.equal(element.page, 0);
    });

    it('Does nothing when page index is 0', () => {
      element.paginate = true;
      element.page = 0;
      element.previousPage();
      assert.equal(element.page, 0);
    });
  });
});
