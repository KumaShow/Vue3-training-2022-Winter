import{u as m}from"./useToastMessageStore-735ffa67.js";import{b as v,_ as g,r as c,o as r,c as h,e,g as t,q as a,x as b,i as n,y as x,z as T,p as u,A,F as y}from"./index-e4284eff.js";import{T as V}from"./TheLoading-39dc63e8.js";import{T as M}from"./TheToastMessage-9a4b64ea.js";import"./useLoadingStore-9d97ba22.js";const N={methods:{...v(m,["pushMessage"]),logout(){document.cookie="hexToken=; expires=;",this.pushMessage({title:"已登出"}),this.$router.push("/")}}},I=s=>(x("data-v-8723d6e5"),s=s(),T(),s),w={class:"header sticky-top"},B={class:"navbar navbar-expand-lg navbar-dark bg-dark h-100"},E={class:"container"},L=I(()=>e("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[e("span",{class:"navbar-toggler-icon"})],-1)),R={class:"collapse navbar-collapse justify-content-between",id:"navbarNav"},D={class:"navbar-nav"},P={class:"nav-item me-3 text-decoration-none"},S={class:"nav-item me-3 text-decoration-none"},C={class:"nav-item me-3 text-decoration-none"},z={class:"nav-item me-3 text-decoration-none"},F={class:"nav-item me-3 text-decoration-none"},O={class:"nav-item me-3 text-decoration-none"},W={class:"navbar-nav"};function j(s,i,d,k,p,l){const o=c("RouterLink");return r(),h("header",w,[e("nav",B,[e("div",E,[L,e("div",R,[e("ul",D,[e("li",P,[t(o,{class:"nav-link link-hover active",to:"/admin"},{default:a(()=>[n("後台")]),_:1})]),e("li",S,[t(o,{class:"nav-link link-hover",to:"/admin/products"},{default:a(()=>[n("產品管理")]),_:1})]),e("li",C,[t(o,{class:"nav-link link-hover",to:"/admin/orders"},{default:a(()=>[n("訂單管理")]),_:1})]),e("li",z,[t(o,{class:"nav-link link-hover",to:"/admin/coupon"},{default:a(()=>[n("優惠券管理")]),_:1})]),e("li",F,[t(o,{class:"nav-link link-hover",to:"/admin/news"},{default:a(()=>[n("文章管理")]),_:1})]),e("li",O,[t(o,{class:"nav-link link-hover",to:"/"},{default:a(()=>[n("回首頁")]),_:1})])]),e("div",W,[e("a",{href:"#",class:"nav-link link-hover",onClick:i[0]||(i[0]=b((..._)=>l.logout&&l.logout(..._),["prevent"]))},"登出")])])])])])}const q=g(N,[["render",j],["__scopeId","data-v-8723d6e5"]]);const{VITE_API:H}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"benson-vue3",BASE_URL:"/Vue3-training-2022-Winter/Week6-7/dist/",MODE:"production",DEV:!1,PROD:!0},U={components:{AdminNavBar:q,TheLoading:V,TheToastMessage:M},data(){return{isAdmin:!1}},mounted(){this.checkAdmin()},methods:{...v(m,["pushMessage"]),checkAdmin(){const s=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=`${s}`;const i=`${H}/api/user/check`;s?this.$http.post(i).then(()=>{this.isAdmin=!0}).catch(d=>{this.pushMessage({style:"danger",title:"驗證失敗，請重新登入",content:`${d.response.data.message}`}),this.$router.push("/login")}):(this.pushMessage({style:"danger",title:"你尚未登入，請先登入驗證"}),this.$router.push("/login"))}}},G={class:"position-relative"},J={key:0,class:"container"},K=e("h2",{class:"text-center my-3"},"後台",-1),Q=[K];function X(s,i,d,k,p,l){const o=c("AdminNavBar"),_=c("RouterView"),f=c("TheLoading"),$=c("TheToastMessage");return r(),h(y,null,[t(o),e("div",G,[this.$route.path==="/admin"?(r(),h("section",J,Q)):u("",!0),p.isAdmin?(r(),A(_,{key:1})):u("",!0),t(f),t($)])],64)}const oe=g(U,[["render",X]]);export{oe as default};