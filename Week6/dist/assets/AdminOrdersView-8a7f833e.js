import{M as b,T as $}from"./TheLoading-a7d044d4.js";import{_ as m,o as d,c as l,e as t,t as a,b as f,r as h,F as u,f as M,g as _,aq as y}from"./index-a232e2f3.js";import{u as v}from"./useLoadingStore-f2bb9720.js";const A={data(){return{modal:{},orderId:""}},methods:{openModal(s){this.modal.show(),this.orderId=s}},mounted(){this.modal=new b(this.$refs.modal)}},D={class:"modal",ref:"modal",tabindex:"-1"},I={class:"modal-dialog"},w={class:"modal-content"},T=t("div",{class:"modal-header"},[t("h2",null,"這個人很懶甚麼都還沒做"),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),x={class:"modal-body"},V=t("div",{class:"modal-footer"},[t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Close "),t("button",{type:"button",class:"btn btn-primary"},"Save changes")],-1);function E(s,e,r,i,n,c){return d(),l("div",D,[t("div",I,[t("div",w,[T,t("div",x,[t("p",null,"訂單編號 "+a(n.orderId),1)]),V])])],512)}const O=m(A,[["render",E]]),{VITE_API:P,VITE_API_PATH:S}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"benson-vue3",BASE_URL:"/Vue3-training-2022-Winter/Week6/dist/",MODE:"production",DEV:!1,PROD:!0},k={components:{AdminOrderModal:O,TheLoading:$},data(){return{orders:[],pagination:{}}},mounted(){this.getOrders()},computed:{orderDate(){return this.orders.create_at}},methods:{...f(v,["loadingState"]),getOrders(){const s=`${P}/api/${S}/admin/orders`;this.loadingState(!0),this.$http.get(s).then(e=>{this.orders=e.data.orders,this.loadingState(!1)})},createDate(s){const e=new Date(s*1e3),r=e.getFullYear(),i=e.getMonth()+1>=10?e.getMonth()+1:`0${e.getMonth()+1}`,n=e.getDate()>=10?e.getDate():`0${e.getDate()}`;return`${r}/${i}/${n}`},openModal(s){this.$refs.orderModal.openModal(s)}}},C=t("h2",{class:"text-center my-3"},"訂單列表",-1),L={class:"table mt-4 container"},B=t("thead",null,[t("tr",null,[t("th",{width:"15%"},"訂單日期"),t("th",{width:"25%"},"訂單編號"),t("th",{width:"20%"},"訂購人"),t("th",{width:"20%"},"信箱"),t("th",{width:"10%"},"訂單狀態"),t("th",{width:"10%"},"操作")])],-1),F=["onClick"];function H(s,e,r,i,n,c){const p=h("AdminOrderModal"),g=h("TheLoading");return d(),l(u,null,[C,t("table",L,[B,t("tbody",null,[(d(!0),l(u,null,M(n.orders,o=>(d(),l("tr",{key:o.id,class:"align-middle"},[t("td",null,a(c.createDate(o.create_at)),1),t("td",null,a(o.id),1),t("td",null,a(o.user.name),1),t("td",null,a(o.user.email),1),t("td",null,[t("span",{class:y({"text-success":o.is_paid,"text-danger":!o.is_paid})},a(o.is_paid?"已付款":"未付款"),3)]),t("td",null,[t("button",{class:"btn btn-outline-primary",type:"button",onClick:N=>c.openModal(o.id)}," 編輯 ",8,F)])]))),128))])]),_(p,{ref:"orderModal"},null,512),_(g)],64)}const z=m(k,[["render",H]]);export{z as default};
