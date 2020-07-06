import { LitElement, TemplateResult, CSSResult } from 'lit-element';

export class JsonTablePrimitiveTeaserElement extends LitElement {
  readonly styles: CSSResult;
  render(): TemplateResult;

  // If true then the whole value will be visible.
  opened: boolean;
  // DOM change observer
  _observer: MutationObserver;
  // if true then the content overflows the max height area.
  _isOverflow: boolean;
  // Container's max height when closed.
  maxHeight: string;
  readonly _wrapper: HTMLDivElement;

  constructor();

  connectedCallback(): void;

  disconnectedCallback(): void;

  firstUpdated(): void;

  _contentChanged(): void;

  toggle(e: PointerEvent): void;

  _computeToggleLabel(opened: boolean): string;

  _maxHeightChanged(maxHeight?: string): void;
}
