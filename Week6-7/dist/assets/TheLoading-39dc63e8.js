import{j as W,k as J,l as K,m as Q,b as R,_ as Y,r as Z,o as ee,c as te,g as ne}from"./index-e4284eff.js";import{u as $}from"./useLoadingStore-9d97ba22.js";var C={},oe={get exports(){return C},set exports(c){C=c}};(function(c,h){(function(_,d){c.exports=d(W)})(J,g=>(()=>{var _={935:(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.default=(a,v)=>{const m=a.__vccOpts||a;for(const[b,y]of v)m[b]=y;return m}},976:t=>{t.exports=g}},d={};function r(t){var o=d[t];if(o!==void 0)return o.exports;var a=d[t]={exports:{}};return _[t](a,a.exports,r),a.exports}r.d=(t,o)=>{for(var a in o)r.o(o,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:o[a]})},r.o=(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r.r=t=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var p={};return(()=>{r.r(p),r.d(p,{Component:()=>w,LoadingPlugin:()=>H,default:()=>q,useLoading:()=>k});var t=r(976);function o(e){if(typeof e.remove<"u")e.remove();else{var n;(n=e.parentNode)===null||n===void 0||n.removeChild(e)}}function a(e,n,l){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const u=(0,t.h)(e,n,s),i=document.createElement("div");return i.classList.add("vld-container"),l.appendChild(i),(0,t.render)(u,i),u.component}function v(){return typeof window<"u"}const m=v()?window.HTMLElement:Object,b=["aria-busy"],y={class:"vl-icon"};function N(e,n,l,s,u,i){return(0,t.openBlock)(),(0,t.createBlock)(t.Transition,{name:e.transition},{default:(0,t.withCtx)(()=>[(0,t.withDirectives)((0,t.createElementVNode)("div",{tabindex:"0",class:(0,t.normalizeClass)(["vl-overlay vl-active",{"vl-full-page":e.isFullPage}]),"aria-busy":e.isActive,"aria-label":"Loading",style:(0,t.normalizeStyle)({zIndex:e.zIndex})},[(0,t.createElementVNode)("div",{class:"vl-background",onClick:n[0]||(n[0]=(0,t.withModifiers)(function(){return e.cancel&&e.cancel(...arguments)},["prevent"])),style:(0,t.normalizeStyle)(e.bgStyle)},null,4),(0,t.createElementVNode)("div",y,[(0,t.renderSlot)(e.$slots,"before"),(0,t.renderSlot)(e.$slots,"default",{},()=>[((0,t.openBlock)(),(0,t.createBlock)((0,t.resolveDynamicComponent)(e.loader),{color:e.color,width:e.width,height:e.height},null,8,["color","width","height"]))]),(0,t.renderSlot)(e.$slots,"after")])],14,b),[[t.vShow,e.isActive]])]),_:3},8,["name"])}const L={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(e){if(!this.isActive||e.target===this.$el||this.$el.contains(e.target))return;let n=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||n&&n.contains(e.target))&&(e.preventDefault(),this.$el.focus())}},beforeUnmount(){document.removeEventListener("focusin",this.focusIn)}},P=["width","height","stroke"],B=[(0,t.createStaticVNode)('<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".25" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s" repeatCount="indefinite"></animateTransform></path></g></g>',1)];function M(e,n,l,s,u,i){return(0,t.openBlock)(),(0,t.createElementBlock)("svg",{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:e.width,height:e.height,stroke:e.color},B,8,P)}const x=(0,t.defineComponent)({name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}});var f=r(935);const j=(0,f.default)(x,[["render",M]]),E=["fill","width","height"],T=[(0,t.createStaticVNode)('<circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle>',3)];function F(e,n,l,s,u,i){return(0,t.openBlock)(),(0,t.createElementBlock)("svg",{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:e.color,width:e.width,height:e.height},T,8,E)}const O=(0,t.defineComponent)({name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}}),A=(0,f.default)(O,[["render",F]]),V=["height","width","fill"],D=[(0,t.createStaticVNode)('<rect x="0" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="10" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="20" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>',3)];function z(e,n,l,s,u,i){return(0,t.openBlock)(),(0,t.createElementBlock)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:e.height,width:e.width,fill:e.color},D,8,V)}const X=(0,t.defineComponent)({name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}}),I={Spinner:j,Dots:A,Bars:(0,f.default)(X,[["render",z]])},U=(0,t.defineComponent)({name:"VueLoading",mixins:[L],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,m],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!1},transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},components:I,emits:["hide","update:active"],data(){return{isActive:this.active}},mounted(){document.addEventListener("keyup",this.keyPress)},methods:{cancel(){!this.canCancel||!this.isActive||(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{const e=this.$el.parentElement;(0,t.render)(null,e),o(e)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vl-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vl-shown")},keyPress(e){e.keyCode===27&&this.cancel()}},watch:{active(e){this.isActive=e},isActive(e){e?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity}}},beforeUnmount(){document.removeEventListener("keyup",this.keyPress)}}),w=(0,f.default)(U,[["render",N]]);function k(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return{show(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:n;const i=Object.assign({},e,l,{programmatic:!0,lockScroll:!0,isFullPage:!1,active:!0});let S=i.container;i.container||(S=document.body,i.isFullPage=!0);const G=Object.assign({},n,s);return{hide:a(w,i,S,G).ctx.hide}}}}const H=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=k(n,l);e.config.globalProperties.$loading=s,e.provide("$loading",s)},q=w})(),p})())})(oe);const ae=K(C);const ie={components:{Loading:ae},computed:{...Q($,["isLoading","fullPage"])},methods:{...R($,["doAjax","onCancel"])}},re={class:"vl-parent"};function se(c,h,g,_,d,r){const p=Z("loading");return ee(),te("div",re,[ne(p,{active:c.isLoading,"onUpdate:active":h[0]||(h[0]=t=>c.isLoading=t),"can-cancel":!1,"on-cancel":c.onCancel,"is-full-page":c.fullPage},null,8,["active","on-cancel","is-full-page"])])}const be=Y(ie,[["render",se]]);export{be as T};