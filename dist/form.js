!function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(s,a){function o(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,r)}l((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const s=n(2),a=n(3),o=n(4),r=n(5),l=n(6),c=n(7);n(8),n(9),n(10);class u extends HTMLElement{constructor(){super(),this.taxRadio=[".tax-pit .text",".tax-pit19 .text",".tax-cit .text"],this.addSelectedClass=(t,e)=>{t.forEach(t=>{var n;const i=null===(n=this.find(t))||void 0===n?void 0:n.classList;i&&(t===e?i.add("selected"):null==i||i.remove("selected"))})},this.setChangeHandler=(t,e)=>{const n=this.find(t);null==n||n.addEventListener("change",e)},this.setInputHandler=(t,e)=>{const n=this.find(t);null==n||n.addEventListener("input",e)},this.setClickHandler=(t,e)=>{const n=this.find(t);null==n||n.addEventListener("click",e)},this.find=t=>this.shadow.querySelector(t),this.isValid=t=>!!t&&c.isValidNumber(t)&&c.isPositiveNumber(t),this.handleMonthIcomeInput=t=>{t.currentTarget&&this.updateState({monthlyIncome:t.currentTarget.value,annualIncome:t.currentTarget.value&&this.isValid(t.currentTarget.value)?12*t.currentTarget.value:void 0})},this.handleAnnualIncomeInput=t=>{t.currentTarget&&this.updateState({monthlyIncome:t.currentTarget.value&&this.isValid(t.currentTarget.value)?(t.currentTarget.value/12).toFixed(2):void 0,annualIncome:t.currentTarget.value})},this.handleTaxSelection=(t,e)=>{this.showIncorectTaxMessage(!1,e),this.addSelectedClass(this.taxRadio,e),this.updateState({selectedTax:t})},this.showIncorectTaxMessage=(t,e)=>{var n,i,s,a;this.addSelectedClass(this.taxRadio,e),t?(null===(n=this.selectors.incorrectTax)||void 0===n||n.classList.add("visible"),null===(i=this.selectors.incomeInput)||void 0===i||i.classList.remove("visible")):(null===(s=this.selectors.incorrectTax)||void 0===s||s.classList.remove("visible"),null===(a=this.selectors.incomeInput)||void 0===a||a.classList.add("visible"))},this.handleCalculation=()=>{var t,e,n,i,a;if(this.state.selectedTax&&c.isValidNumber(this.state.annualIncome)){const l=this.state.selectedTax===s.Tax.PIT?o.calculateForPIT(this.state.annualIncome||0):r.calculateForCIT(this.state.annualIncome||0),c=this.formatter.format(l.donationSum),u=this.formatter.format(l.taxDeduction);null===(t=this.selectors.taxSelection)||void 0===t||t.classList.remove("visible"),null===(e=this.selectors.incomeInput)||void 0===e||e.classList.remove("visible"),null===(n=this.selectors.actions)||void 0===n||n.classList.add("visible"),null===(i=this.selectors.calculateButton)||void 0===i||i.classList.remove("visible"),null===(a=this.selectors.changeButton)||void 0===a||a.classList.add("visible"),this.selectors.taxOutput.innerHTML=`\n                <h3>Twój wynik</h3>\n                <p>\n                    <span>Od podatku możesz odliczyć darowizny w maksymalnej kwocie: </span>\n                    <strong class="donation-result">${c}</strong>\n                </p>\n                <p>\n                    <span>W ten sposób zapłacisz nawet o </span>\n                    <strong class="tax-result">${u}</strong>\n                    <span> mniej podatku!</span>\n                </p>\n            `}},this.handleChangeData=()=>{var t,e,n,i,s;null===(t=this.selectors.taxSelection)||void 0===t||t.classList.add("visible"),null===(e=this.selectors.incomeInput)||void 0===e||e.classList.add("visible"),null===(n=this.selectors.actions)||void 0===n||n.classList.remove("visible"),null===(i=this.selectors.calculateButton)||void 0===i||i.classList.add("visible"),null===(s=this.selectors.changeButton)||void 0===s||s.classList.remove("visible"),this.selectors.taxOutput.innerHTML=""},this.renderInputField=(t,e,...n)=>{const i=this.find(t+" .income-input");if(i){i.value=e?e.toString():"";const s=this.find(t+" .validation");s&&c.applyValidation(s,e,n)}},this.state={},this.shadow=this.attachShadow({mode:"open"}),this.formatter=new l.CurrencyFormatter("PLN","pl-PL"),this.selectors={}}updateState(t){this.state=Object.assign(Object.assign({},this.state),t),this.render()}connectedCallback(){return i(this,void 0,void 0,(function*(){const t=yield a.getTemplate("./form.html");this.shadow.appendChild(null==t?void 0:t.content.cloneNode(!0)),this.setChangeHandler(".tax-pit .radio-input",a.preventPropagationInvoke(()=>this.handleTaxSelection(s.Tax.PIT,".tax-pit .text"))),this.setChangeHandler(".tax-pit19 .radio-input",a.preventPropagationInvoke(()=>this.showIncorectTaxMessage(!0,".tax-pit19 .text"))),this.setChangeHandler(".tax-cit .radio-input",a.preventPropagationInvoke(()=>this.handleTaxSelection(s.Tax.CIT,".tax-cit .text"))),this.setInputHandler(".month-income .income-input",this.handleMonthIcomeInput),this.setInputHandler(".annual-income .income-input",this.handleAnnualIncomeInput),this.setClickHandler("#calculate-donation-btn",a.preventPropagationInvoke(this.handleCalculation)),this.setClickHandler("#change-data-btn",a.preventPropagationInvoke(this.handleChangeData)),this.render()}))}render(){return i(this,void 0,void 0,(function*(){this.selectors.taxSelection=this.find("section.tax-type-select"),this.selectors.incomeInput=this.find("section.income-input"),this.selectors.incorrectTax=this.find("section.incorrect-tax"),this.selectors.actions=this.find("section.actions"),this.selectors.taxOutput=this.find(".tax-output"),this.selectors.calculateButton=this.find("button#calculate-donation-btn"),this.selectors.changeButton=this.find("button#change-data-btn"),this.renderInputField(".month-income",this.state.monthlyIncome||0,[c.isValidNumber,"Miesięczny dochód powinien być liczbą"],[c.isPositiveNumber,"Miesięczny dochód powinien być dodatni"]),this.renderInputField(".annual-income",this.state.annualIncome||0,[c.isValidNumber,"Roczny dochód powinien być liczbą"],[c.isPositiveNumber,"Roczny dochód powinien być dodatni"]),this.selectors.calculateButton.disabled=!this.state.selectedTax||!this.isValid(this.state.annualIncome)}))}}customElements.get("donation-form")||customElements.define("donation-form",u)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.IncomeType=e.Tax=void 0,function(t){t.PIT="PIT",t.CIT="CIT"}(e.Tax||(e.Tax={})),function(t){t.MONTHLY="MONTHLY",t.ANNUAL="ANNUAL"}(e.IncomeType||(e.IncomeType={}))},function(t,e,n){"use strict";var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(s,a){function o(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,r)}l((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.preventPropagation=e.preventPropagationInvoke=e.getTemplate=void 0,e.getTemplate=(t,e="template")=>i(void 0,void 0,void 0,(function*(){const n=yield fetch(t),i=yield n.text();return(new DOMParser).parseFromString(i,"text/html").querySelector(e)})),e.preventPropagationInvoke=t=>e=>{e.preventDefault(),e.stopPropagation(),t()},e.preventPropagation=t=>{t.preventDefault(),t.stopPropagation()}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.calculateForPIT=void 0;e.calculateForPIT=t=>{const e=Math.round(i(t));return{donationSum:e,taxDeduction:Math.round(s(t)-s(t-e))}};const i=t=>{let e=0;return t>8e3&&(e=.94*t>8e3?.06*t:t-8e3),e},s=t=>{let e=0;if(t<=8e3)return 0;if(t<=13e3){e=.17*t-(t=>1360-834.88/5e3*(t-8e3))(t)}else if(t<=85528)e=.17*t-525.12;else if(t<=127e3){e=14539.76+.32*(t-85528)-(t=>525.12-525.12/41472*(t-85528))(t)}else e=14539.76+.32*(t-85528);return e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.calculateForCIT=void 0;e.calculateForCIT=t=>({donationSum:Math.round(i(t)),taxDeduction:Math.round(s(t))});const i=t=>.1*t,s=t=>t<=5418360?.09*i(t):.19*i(t)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CurrencyFormatter=void 0;e.CurrencyFormatter=class{constructor(t,e){this.format=t=>this.formatter.format(t),this.formatter=new Intl.NumberFormat(e,{style:"currency",currency:t,minimumFractionDigits:2,maximumFractionDigits:2,useGrouping:!0})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.applyValidation=e.isPositiveNumber=e.isValidNumber=void 0,e.isValidNumber=t=>!t||!isNaN(t),e.isPositiveNumber=t=>!t||t>-1,e.applyValidation=(t,e,n)=>{t.innerHTML="";for(let i of n){const n=i[0],s=i[1];if(!n(e)){const e=document.createElement("div");e.className="validation-message",e.innerHTML=s,null==t||t.appendChild(e);break}}}},function(t,e,n){},function(t,e,n){},function(t,e,n){}]);