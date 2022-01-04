import { fixture, assert, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import '../json-table.js';

/** @typedef {import('../').JsonTableElement} JsonTableElement */

describe('<json-table>', () => {
  /**
   * 
   * @returns {Promise<JsonTableElement>}
   */
  async function basicFixture() {
    return fixture(`<json-table paginate></json-table>`);
  }

  describe('test JSON object', () => {
    let element;
    let jsonData;

    before(async () => {
      const response = await fetch('/base/demo/git-candidate-list.json');
      jsonData = await response.json();
    });

    beforeEach(async () => {
      element = await basicFixture();
      element.json = jsonData;
      await aTimeout(10);
    });

    it('_renderJson should be set', () => {
      assert.isObject(element._renderJson);
    });

    it('parserError should equal false', () => {
      assert.isFalse(element.parserError);
    });

    it('Should render json-table-object', () => {
      const renderer = element.shadowRoot.querySelector('json-table-object');
      assert.ok(renderer);
    });
  });

  describe('test JSON array', () => {
    let element;
    let jsonData;

    before(async () => {
      const response = await fetch('/base/demo/example.json');
      jsonData = await response.json();
    });

    beforeEach(async () => {
      element = await basicFixture();
      element.json = jsonData;
      await aTimeout(10);
    });

    it('_renderJson should be set', () => {
      assert.isArray(element._renderJson);
    });

    it('parserError should equal false', () => {
      assert.isFalse(element.parserError);
    });

    it('Should render json-table-array', () => {
      const renderer = element.shadowRoot.querySelector('json-table-array');
      assert.ok(renderer);
    });
  });

  describe('_jsonChanged()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('resets parserError', () => {
      element._parserError = true;
      element._jsonChanged();
      assert.isFalse(element.parserError);
    });

    it('resets _renderJson', () => {
      element._renderJson = [];
      element._jsonChanged();
      assert.isUndefined(element._renderJson);
    });

    it('Calls _setRenderJson() with passed object', async () => {
      const arg = {};
      const spy = sinon.spy(element, '_setRenderJson');
      element._jsonChanged(arg);
      assert.deepEqual(spy.args[0][0], arg);
      await aTimeout(1);
    });

    it('Calls _setRenderJson() with passed array', async () => {
      const arg = [];
      const spy = sinon.spy(element, '_setRenderJson');
      element._jsonChanged(arg);
      assert.deepEqual(spy.args[0][0], arg);
      await aTimeout(1);
    });

    it('Calls _setRenderJson() with parsed object', async () => {
      const arg = '{"test": true}';
      const spy = sinon.spy(element, '_setRenderJson');
      element._jsonChanged(arg);
      assert.deepEqual(spy.args[0][0], { test: true });
      await aTimeout(1);
    });

    it('Calls _setRenderJson() on json property change', async () => {
      const arg = {};
      const spy = sinon.spy(element, '_setRenderJson');
      element.json = arg;
      assert.deepEqual(spy.args[0][0], arg);
      await aTimeout(1);
    });

    it('Calls _setRenderJson() only once per the same object', async () => {
      const arg = {};
      element.json = arg;
      await aTimeout(1);
      const spy = sinon.spy(element, '_setRenderJson');
      element.json = arg;
      assert.isFalse(spy.called);
    });

    it('sets parserError', () => {
      element._renderJson = [];
      element._jsonChanged('{ "test"');
      assert.isTrue(element.parserError);
    });
  });
});
