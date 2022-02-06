import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('copy-able')
class CopyAble extends LitElement {
    override render() {
        return "Hello World!";
    }
}
