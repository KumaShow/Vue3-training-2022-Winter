import{M as U,T as w}from"./TheLoading-a7d044d4.js";import{_ as y,o as d,c as r,e as t,w as c,v as u,F as P,f as I,bu as h,bf as E,i as M,t as p,aq as v,b as C,r as g,g as f}from"./index-a232e2f3.js";import{u as D}from"./useLoadingStore-f2bb9720.js";const{VITE_API:V,VITE_API_PATH:$}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"benson-vue3",BASE_URL:"/Vue3-training-2022-Winter/Week6/dist/",MODE:"production",DEV:!1,PROD:!0},L={data(){return{modal:null,product:{imagesUrl:[]}}},props:{isNew:{type:Boolean}},methods:{updateProduct(){let l=`${V}/api/${$}/admin/product/${this.product.id}`,e="put";this.isNew===!0&&(l=`${V}/api/${$}/admin/product`,e="post"),this.$http[e](l,{data:this.product}).then(()=>{this.modal.hide(),this.$emit("get-products")}).catch(n=>alert(n))},createImages(){this.product.imagesUrl=[],this.product.imagesUrl.push("")},deleteImage(l){const e=this.product.imagesUrl,n=Object.values(e).findIndex(_=>_===l);this.product.imagesUrl.splice(n,1)},openModal(l){this.product=l,this.modal.show()}},mounted(){this.modal=new U(this.$refs.modal)}},N={id:"productModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"},O={class:"modal-dialog modal-xl"},S={class:"modal-content border-0"},H=t("div",{class:"modal-header bg-dark text-white"},[t("h5",{id:"productModalLabel",class:"modal-title"},[t("span",null,"新增產品")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),B={class:"modal-body"},G={class:"row"},R={class:"col-sm-4"},W={class:"mb-2"},j={class:"mb-3"},F=t("label",{for:"imageUrl",class:"form-label"},"輸入圖片網址",-1),q=["src","alt"],z=t("h3",{class:"mb-3"},"多圖新增",-1),X={key:0},J={class:"mb-3"},K={class:"d-flex mb-2"},Q=t("label",{for:"imageUrl",class:"form-label me-auto mb-0"},"圖片網址",-1),Y=["onClick"],Z=["onUpdate:modelValue"],tt=["src"],et={key:0},ot={key:1},st={key:1},lt={class:"col-sm-8"},nt={class:"mb-3"},it=t("label",{for:"title",class:"form-label"},"標題",-1),dt={class:"row"},rt={class:"mb-3 col-md-6"},at=t("label",{for:"category",class:"form-label"},"分類",-1),ct={class:"mb-3 col-md-6"},ut=t("label",{for:"price",class:"form-label"},"單位",-1),pt={class:"row"},mt={class:"mb-3 col-md-6"},_t=t("label",{for:"origin_price",class:"form-label"},"原價",-1),ht={class:"mb-3 col-md-6"},bt=t("label",{for:"price",class:"form-label"},"售價",-1),gt=t("hr",null,null,-1),ft={class:"mb-3"},vt=t("label",{for:"description",class:"form-label"},"產品描述",-1),Pt={class:"mb-3"},yt=t("label",{for:"content",class:"form-label"},"說明內容",-1),kt={class:"mb-3"},At={class:"form-check"},It=t("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),xt={class:"modal-footer"},Mt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Vt(l,e,n,_,o,i){return d(),r("div",N,[t("div",O,[t("div",S,[H,t("div",B,[t("div",G,[t("div",R,[t("div",W,[t("div",j,[F,c(t("input",{type:"text",class:"form-control",placeholder:"請輸入圖片連結","onUpdate:modelValue":e[0]||(e[0]=s=>o.product.imageUrl=s)},null,512),[[u,o.product.imageUrl]])]),t("img",{class:"img-fluid",src:o.product.imageUrl,alt:o.product.title},null,8,q)]),z,Array.isArray(o.product.imagesUrl)?(d(),r("div",X,[(d(!0),r(P,null,I(o.product.imagesUrl,(s,m)=>(d(),r("div",{class:"mb-1",key:m},[t("div",J,[t("div",K,[Q,t("a",{class:"btn btn-sm btn-outline-danger text-decoration-none",onClick:h(b=>i.deleteImage(s),["prevent"])},"X ",8,Y)]),c(t("input",{"onUpdate:modelValue":b=>o.product.imagesUrl[m]=b,type:"text",class:"form-control",placeholder:"請輸入圖片連結"},null,8,Z),[[u,o.product.imagesUrl[m]]])]),t("img",{class:"img-fluid",src:s},null,8,tt)]))),128)),!o.product.imagesUrl.length||o.product.imagesUrl[o.product.imagesUrl.length-1]?(d(),r("div",et,[t("button",{class:"btn btn-outline-primary btn-sm d-block w-100",onClick:e[1]||(e[1]=s=>o.product.imagesUrl.push(""))}," 新增圖片 ")])):(d(),r("div",ot,[t("button",{class:"btn btn-outline-danger btn-sm d-block w-100",onClick:e[2]||(e[2]=s=>o.product.imagesUrl.pop())}," 取消新增 ")]))])):(d(),r("div",st,[t("button",{class:"btn btn-outline-primary btn-sm d-block w-100",onClick:e[3]||(e[3]=(...s)=>i.createImages&&i.createImages(...s))}," 新增圖片 ")]))]),t("div",lt,[t("div",nt,[it,c(t("input",{"onUpdate:modelValue":e[4]||(e[4]=s=>o.product.title=s),id:"title",class:"form-control",placeholder:"請輸入標題",type:"text"},null,512),[[u,o.product.title]])]),t("div",dt,[t("div",rt,[at,c(t("input",{"onUpdate:modelValue":e[5]||(e[5]=s=>o.product.category=s),id:"category",class:"form-control",placeholder:"請輸入分類",type:"text"},null,512),[[u,o.product.category]])]),t("div",ct,[ut,c(t("input",{"onUpdate:modelValue":e[6]||(e[6]=s=>o.product.unit=s),id:"unit",class:"form-control",placeholder:"請輸入單位",type:"text"},null,512),[[u,o.product.unit]])])]),t("div",pt,[t("div",mt,[_t,c(t("input",{"onUpdate:modelValue":e[7]||(e[7]=s=>o.product.origin_price=s),id:"origin_price",class:"form-control",min:"0",placeholder:"請輸入原價",type:"number"},null,512),[[u,o.product.origin_price,void 0,{number:!0}]])]),t("div",ht,[bt,c(t("input",{"onUpdate:modelValue":e[8]||(e[8]=s=>o.product.price=s),id:"price",class:"form-control",min:"0",placeholder:"請輸入售價",type:"number"},null,512),[[u,o.product.price,void 0,{number:!0}]])])]),gt,t("div",ft,[vt,c(t("textarea",{"onUpdate:modelValue":e[9]||(e[9]=s=>o.product.description=s),id:"description",class:"form-control",placeholder:"請輸入產品描述",type:"text"},`
                `,512),[[u,o.product.description]])]),t("div",Pt,[yt,c(t("textarea",{"onUpdate:modelValue":e[10]||(e[10]=s=>o.product.content=s),id:"description",class:"form-control",placeholder:"請輸入說明內容",type:"text"},`
                `,512),[[u,o.product.content]])]),t("div",kt,[t("div",At,[c(t("input",{"false-value":0,"true-value":1,"onUpdate:modelValue":e[11]||(e[11]=s=>o.product.is_enabled=s),id:"is_enabled",class:"form-check-input",type:"checkbox"},null,512),[[E,o.product.is_enabled]]),It])])])])]),t("div",xt,[Mt,t("button",{type:"button",class:"btn btn-primary",onClick:e[12]||(e[12]=(...s)=>i.updateProduct&&i.updateProduct(...s))}," 確認 ")])])])],512)}const $t=y(L,[["render",Vt]]),{VITE_API:Ut,VITE_API_PATH:Tt}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"benson-vue3",BASE_URL:"/Vue3-training-2022-Winter/Week6/dist/",MODE:"production",DEV:!1,PROD:!0},wt={data(){return{modal:null}},props:{tempProduct:{type:Object}},mounted(){this.modal=new U(this.$refs.modal)},methods:{openModal(){this.modal.show()},closeModal(){this.modal.hide()},delProduct(){const l=`${Ut}/api/${Tt}/admin/product/${this.tempProduct.id}`;this.$http.delete(l).then(()=>{this.closeModal(),this.$emit("get-products")}).catch(e=>console.log(e))}}},Et={id:"delProductModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"delProductModalLabel","aria-hidden":"true"},Ct={class:"modal-dialog"},Dt={class:"modal-content border-0"},Lt=t("div",{class:"modal-header bg-danger text-white"},[t("h5",{id:"delProductModalLabel",class:"modal-title"},[t("span",null,"刪除產品")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),Nt={class:"modal-body"},Ot={class:"text-danger"},St={class:"modal-footer"},Ht=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Bt(l,e,n,_,o,i){return d(),r("div",Et,[t("div",Ct,[t("div",Dt,[Lt,t("div",Nt,[M(" 是否刪除 "),t("strong",Ot,p(n.tempProduct.title),1),M(" 商品(刪除後將無法恢復)。 ")]),t("div",St,[Ht,t("button",{type:"button",class:"btn btn-danger",onClick:e[0]||(e[0]=s=>i.delProduct(n.tempProduct.id))}," 確認刪除 ")])])])],512)}const Gt=y(wt,[["render",Bt]]),Rt={props:{pages:{type:Object,default(){return{}}}}},Wt={"aria-label":"Page navigation example"},jt={class:"pagination justify-content-center mt-4"},Ft=t("span",{"aria-hidden":"true"},"«",-1),qt=[Ft],zt=["onClick"],Xt=t("span",{"aria-hidden":"true"},"»",-1),Jt=[Xt];function Kt(l,e,n,_,o,i){return d(),r("nav",Wt,[t("ul",jt,[t("li",{class:v(["page-item",{disabled:!n.pages.has_pre}])},[t("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:e[0]||(e[0]=h(s=>l.$emit("get-products",n.pages.current_page-1),["prevent"]))},qt)],2),(d(!0),r(P,null,I(n.pages.total_pages,s=>(d(),r("li",{class:v(["page-item",{active:s===n.pages.current_page}]),key:s+"page"},[t("a",{class:"page-link",href:"#",onClick:h(m=>l.$emit("get-products",s),["prevent"])},p(s),9,zt)],2))),128)),t("li",{class:v(["page-item",{disabled:!n.pages.has_next}])},[t("a",{class:"page-link",href:"#","aria-label":"Next",onClick:e[1]||(e[1]=h(s=>l.$emit("get-products",n.pages.current_page+1),["prevent"]))},Jt)],2)])])}const Qt=y(Rt,[["render",Kt]]),{VITE_API:k,VITE_API_PATH:A}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"benson-vue3",BASE_URL:"/Vue3-training-2022-Winter/Week6/dist/",MODE:"production",DEV:!1,PROD:!0},Yt={data(){return{products:[],tempProduct:{imagesUrl:[]},isNew:!1,pagination:{}}},components:{AdminProductModal:$t,AdminProductModalDelete:Gt,ThePagination:Qt,TheLoading:w},mounted(){this.getProducts()},computed:{},methods:{...C(D,["loadingState"]),getProducts(l=1){const e=`${k}/api/${A}/admin/products?page=${l}`;this.loadingState(!0),this.$http.get(e).then(n=>{this.products=n.data.products,this.pagination=n.data.pagination,this.loadingState(!1)}).catch(n=>{this.loadingState(!1),alert(n)})},updateProduct(){let l=`${k}/api/${A}/admin/product/${this.tempProduct.id}`,e="put";this.isNew===!0&&(l=`${k}/api/${A}/admin/product`,e="post"),this.$http[e](l,{data:this.tempProduct}).then(()=>{this.$refs.productModal.hide(),this.getProducts()}).catch(n=>console.dir(n))},openModal(l,e){l==="new"?(this.isNew=!0,this.tempProduct={imagesUrl:[]},this.$refs.productModal.openModal(this.tempProduct)):l==="edit"?(this.isNew=!1,this.tempProduct={...e},this.$refs.productModal.openModal(this.tempProduct)):l==="delete"&&(this.tempProduct={...e},this.$refs.deleteProductModal.openModal())}}},Zt=t("h2",{class:"text-center my-3"},"後台產品列表",-1),te={class:"text-end"},ee={class:"table mt-4 container"},oe=t("thead",null,[t("tr",null,[t("th",{width:"120"},"分類"),t("th",null,"產品名稱"),t("th",{width:"120"},"原價"),t("th",{width:"120"},"售價"),t("th",{width:"100"},"是否啟用"),t("th",{width:"120"},"編輯")])],-1),se=["onClick"],le={class:"btn-group"},ne=["onClick"],ie=["onClick"];function de(l,e,n,_,o,i){const s=g("ThePagination"),m=g("AdminProductModal"),b=g("AdminProductModalDelete"),T=g("TheLoading");return d(),r(P,null,[Zt,t("div",te,[t("button",{class:"btn btn-primary me-4",onClick:e[0]||(e[0]=a=>i.openModal("new"))}," 建立新的產品 ")]),t("table",ee,[oe,t("tbody",null,[(d(!0),r(P,null,I(o.products,a=>(d(),r("tr",{key:a.id},[t("td",null,p(a.category),1),t("td",null,p(a.title),1),t("td",null,p(a.origin_price),1),t("td",null,p(a.price),1),t("td",null,[t("a",{onClick:h(x=>a.is_enabled=!a.is_enabled,["prevent"]),class:"text-decoration-none link-dark p-2",href:"#!"},[t("span",{class:v({"text-success":a.is_enabled,"text-danger":!a.is_enabled})},p(a.is_enabled?"啟用":"未啟用"),3)],8,se)]),t("td",null,[t("div",le,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:x=>i.openModal("edit",a)}," 編輯 ",8,ne),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:x=>i.openModal("delete",a)}," 刪除 ",8,ie)])])]))),128))])]),f(s,{pages:o.pagination,onGetProducts:i.getProducts},null,8,["pages","onGetProducts"]),f(m,{ref:"productModal","is-new":o.isNew,"temp-product":o.tempProduct,onGetProducts:i.getProducts},null,8,["is-new","temp-product","onGetProducts"]),f(b,{ref:"deleteProductModal","temp-product":o.tempProduct,onGetProducts:i.getProducts},null,8,["temp-product","onGetProducts"]),f(T)],64)}const ue=y(Yt,[["render",de]]);export{ue as default};
