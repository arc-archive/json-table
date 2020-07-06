import { JsonTableElement } from './src/JsonTableElement';

declare global {
  interface HTMLElementTagNameMap {
    "json-table": JsonTableElement;
  }
}
