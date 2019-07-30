import { fixture, assert, nextFrame } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../json-table-primitive-teaser.js';

describe('<json-table-primitive-teaser>', function() {
  async function basicFixture() {
    return (await fixture(`<json-table-primitive-teaser></json-table-primitive-teaser>`));
  }

  describe('getters and setters', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('has _wrapper property', () => {
      assert.ok(element._wrapper);
    });

    it('has maxHeight property', () => {
      assert.equal(element.maxHeight, '160px');
    });

    it('calls _maxHeightChanged()', () => {
      const spy = sinon.spy(element, '_maxHeightChanged');
      element.maxHeight = '10px';
      assert.equal(spy.args[0][0], '10px');
    });
  });

  describe('toggle()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('togglees open state', () => {
      const node = element.shadowRoot.querySelector('a');
      node.click();
      assert.isTrue(element.opened);
    });

    it('cancels click event', () => {
      const spy = sinon.spy();
      element.addEventListener('click', spy);
      const node = element.shadowRoot.querySelector('a');
      node.click();
      assert.isTrue(spy.args[0][0].defaultPrevented);
    });
  });

  describe('_contentChanged()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets _isOverflow', async () => {
      const parts = [];
      for (let i = 0; i < 100; i++) {
        parts[parts.length] = 'lorem ipsum';
      }
      const node = document.createElement('div');
      node.innerHTML = parts.join('<br>\n');
      element.appendChild(node);
      await nextFrame();
      assert.isTrue(element._isOverflow);
    });
  });
});
