import{d as l}from"./index-a232e2f3.js";var i=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function s(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function f(e){if(e.__esModule)return e;var r=e.default;if(typeof r=="function"){var o=function n(){if(this instanceof n){var t=[null];t.push.apply(t,arguments);var a=Function.bind.apply(r,t);return new a}return r.apply(this,arguments)};o.prototype=r.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var t=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(o,n,t.get?t:{enumerable:!0,get:function(){return e[n]}})}),o}const d=l("useLoadingStore",{state:()=>({isLoading:!1,fullPage:!0}),actions:{loadingState(e){this.isLoading=e},onCancel(){console.log("User cancelled the loader.")}}});export{s as a,i as c,f as g,d as u};
