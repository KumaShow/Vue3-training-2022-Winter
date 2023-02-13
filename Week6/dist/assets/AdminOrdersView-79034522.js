import{M as m}from"./modal-c60aad6a.js";import{_ as h,o as d,c as l,e as t,t as n,r as p,F as u,f as b,g as $,l as g}from"./index-f9f93841.js";const f={data(){return{modal:{},orderId:""}},methods:{openModal(s){this.modal.show(),this.orderId=s}},mounted(){this.modal=new m(this.$refs.modal)}},M={class:"modal",ref:"modal",tabindex:"-1"},y={class:"modal-dialog"},v={class:"modal-content"},A=t("div",{class:"modal-header"},[t("h2",null,"這個人很懶甚麼都還沒做"),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),D={class:"modal-body"},I=t("div",{class:"modal-footer"},[t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Close "),t("button",{type:"button",class:"btn btn-primary"},"Save changes")],-1);function w(s,e,r,i,a,c){return d(),l("div",M,[t("div",y,[t("div",v,[A,t("div",D,[t("p",null,"訂單編號 "+n(a.orderId),1)]),I])])],512)}const x=h(f,[["render",w]]),{VITE_API:V,VITE_API_PATH:E}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"benson-vue3",BASE_URL:"/Vue3-training-2022-Winter/Week6/dist/",MODE:"production",DEV:!1,PROD:!0},O={components:{AdminOrderModal:x},data(){return{orders:[],pagination:{}}},mounted(){this.getOrders()},computed:{orderDate(){return this.orders.create_at}},methods:{getOrders(){const s=`${V}/api/${E}/admin/orders`;this.$http.get(s).then(e=>{this.orders=e.data.orders})},createDate(s){const e=new Date(s*1e3),r=e.getFullYear(),i=e.getMonth()+1>=10?e.getMonth()+1:`0${e.getMonth()+1}`,a=e.getDate()>=10?e.getDate():`0${e.getDate()}`;return`${r}/${i}/${a}`},openModal(s){this.$refs.orderModal.openModal(s)}}},P=t("h2",{class:"text-center my-3"},"訂單列表",-1),k={class:"table mt-4 container"},C=t("thead",null,[t("tr",null,[t("th",{width:"15%"},"訂單日期"),t("th",{width:"25%"},"訂單編號"),t("th",{width:"20%"},"訂購人"),t("th",{width:"20%"},"信箱"),t("th",{width:"10%"},"訂單狀態"),t("th",{width:"10%"},"操作")])],-1),T=["onClick"];function B(s,e,r,i,a,c){const _=p("AdminOrderModal");return d(),l(u,null,[P,t("table",k,[C,t("tbody",null,[(d(!0),l(u,null,b(a.orders,o=>(d(),l("tr",{key:o.id,class:"align-middle"},[t("td",null,n(c.createDate(o.create_at)),1),t("td",null,n(o.id),1),t("td",null,n(o.user.name),1),t("td",null,n(o.user.email),1),t("td",null,[t("span",{class:g({"text-success":o.is_paid,"text-danger":!o.is_paid})},n(o.is_paid?"已付款":"未付款"),3)]),t("td",null,[t("button",{class:"btn btn-outline-primary",type:"button",onClick:F=>c.openModal(o.id)}," 編輯 ",8,T)])]))),128))])]),$(_,{ref:"orderModal"},null,512)],64)}const L=h(O,[["render",B]]);export{L as default};
