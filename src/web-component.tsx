import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

class DonationCalculator extends HTMLElement {
  private root?: ReactDOM.Root;

  connectedCallback() {
    this.root = ReactDOM.createRoot(this);

    this.root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
  }
}

customElements.define("donation-calculator", DonationCalculator);