import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { Ref, createRef, ref } from 'lit/directives/ref.js';

@customElement('copy-able')
class CopyAble extends LitElement {

    mainSlot: { value: string } | undefined = undefined;

    static styles = css`
    .clickable {
        cursor: pointer;
    }
    `;

    async _copyToClipboard() {
        if (!this.mainSlot) {
            throw new Error("<copy-able> needs to have a child-element");
        }
        const type = "text/plain";
        const blob = new Blob([this.mainSlot.value], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        await navigator.clipboard.write(data)
        this.dispatchEvent(new CustomEvent("copied", { detail: { value: this.mainSlot.value } }))
    }

    _onSlotChange(event: Event) {
        const slot = event.currentTarget as HTMLSlotElement | null;
        if (!slot) {
            throw new Error("copy-able child-element was unexpectedly null");
        }
        const elements = slot.assignedElements() as Array<HTMLElement>;
        if (elements.length !== 1) {
            throw new Error("<copy-able> expected exactly one child-element!");
        }
        // @ts-ignore
        this.mainSlot = elements[0];
    }

    override render() {
        return html`
        <slot @slotchange="${this._onSlotChange}"></slot>
        <slot @click="${this._copyToClipboard}" class="clickable" name="copyButton">copy</slot>
        `;
    }
}
