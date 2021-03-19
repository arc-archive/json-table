import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import { JsonTableMixin, PropertyModelItem, ModelItem } from './JsonTableMixin.js';

/**
 * An element that displays object structure.
 *
 * ### Example
 *
 * ```html
 * <json-table-object json="{...}"></json-table-object>
 * ```
 */
export declare class JsonTableObjectElement extends JsonTableMixin(LitElement) {
  get styles(): CSSResult;

  render(): TemplateResult;

  _display?: PropertyModelItem[];
  json?: any;
  _json?: any;

  /**
   * Creates a data model from the JSON object.
   * The element is only interested in first level properties. Other properties will be rendered
   * by child elements.
   *
   * TODO: This should be a deep data observer to update only the portion of the model that
   * actually had changed.
   */
  _jsonChanged(json: object): void;

  _computeItemClass(item: ModelItem): string;
}
