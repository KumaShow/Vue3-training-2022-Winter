import{M as k}from"./modal-e715d6fb.js";import{_ as f,o as n,c as r,e as t,w as a,v as u,F as w,f as x,x as A,B as I,i as v,t as p,b as y,r as P,A as $,p as M,g as U}from"./index-e4284eff.js";import{T}from"./ThePagination-8ea93132.js";import{u as D}from"./useToastMessageStore-735ffa67.js";import{u as E}from"./useLoadingStore-9d97ba22.js";const{VITE_API:C,VITE_API_PATH:N}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"benson-vue3",BASE_URL:"/Vue3-training-2022-Winter/Week6-7/dist/",MODE:"production",DEV:!1,PROD:!0},B={props:{isNew:{type:Boolean},product:{type:Object,default(){return{imagesUrl:[]}}}},emits:["update-product"],data(){return{modal:null,tempProduct:{imagesUrl:[]},status:{}}},watch:{product(){this.tempProduct=this.product}},methods:{createImages(){this.tempProduct.imagesUrl=[],this.tempProduct.imagesUrl.push("")},deleteImage(d){const e=this.tempProduct.imagesUrl,l=Object.values(e).findIndex(h=>h===d);this.tempProduct.imagesUrl.splice(l,1)},openModal(){this.modal.show()},closeModal(){this.modal.hide()},uploadFile(){const d=this.$refs.fileInput.files[0],e=new FormData;e.append("file-to-upload",d),console.log(this.formData),this.$http.post(`${C}/api/${N}/admin/upload`,e).then(l=>{console.log(l),this.tempProduct.imageUrl=l.data.imageUrl,this.$refs.files.value=""}).catch(l=>{console.log(l.response)})}},mounted(){this.modal=new k(this.$refs.modal)}},S={id:"productModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"},F={class:"modal-dialog modal-xl"},L={class:"modal-content border-0"},O={class:"modal-header bg-dark text-white"},G={id:"productModalLabel",class:"modal-title"},H={key:0},R={key:1},W=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),j={class:"modal-body"},X={class:"row"},q={class:"col-sm-4"},z={class:"mb-2"},J=t("h3",{class:"mb-3"},"主圖新增",-1),K={class:"mb-3"},Q=t("label",{for:"imageUrl",class:"form-label"},"輸入主要圖片網址",-1),Y={class:"mb-3"},Z=t("label",{for:"customFile",class:"form-label"},"或 上傳圖片 ",-1),tt=["src","alt"],et=t("h3",{class:"mb-3"},"多圖新增",-1),ot={key:0},st={class:"mb-3"},lt={class:"d-flex mb-2"},dt=t("label",{for:"imageUrl",class:"form-label me-auto mb-0"},"圖片網址",-1),it=["onClick"],nt=["onUpdate:modelValue"],rt=["src"],at={key:0},ct={key:1},ut={key:1},mt={class:"col-sm-8"},pt={class:"mb-3"},ht=t("label",{for:"title",class:"form-label"},"標題",-1),_t={class:"row"},bt={class:"mb-3 col-md-6"},gt=t("label",{for:"category",class:"form-label"},"分類",-1),Pt={class:"mb-3 col-md-6"},ft=t("label",{for:"price",class:"form-label"},"單位",-1),vt={class:"row"},yt={class:"mb-3 col-md-6"},Mt=t("label",{for:"origin_price",class:"form-label"},"原價",-1),Ut={class:"mb-3 col-md-6"},kt=t("label",{for:"price",class:"form-label"},"售價",-1),wt=t("hr",null,null,-1),xt={class:"mb-3"},Vt=t("label",{for:"description",class:"form-label"},"產品描述",-1),At={class:"mb-3"},It=t("label",{for:"content",class:"form-label"},"說明內容",-1),$t={class:"mb-3"},Tt={class:"form-check"},Dt=t("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),Et={class:"modal-footer"},Ct=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Nt(d,e,l,h,o,i){return n(),r("div",S,[t("div",F,[t("div",L,[t("div",O,[t("h5",G,[l.isNew?(n(),r("span",H,"新增產品")):(n(),r("span",R,"編輯產品"))]),W]),t("div",j,[t("div",X,[t("div",q,[t("div",z,[J,t("div",K,[Q,a(t("input",{type:"text",class:"form-control",placeholder:"請輸入圖片連結","onUpdate:modelValue":e[0]||(e[0]=s=>o.tempProduct.imageUrl=s)},null,512),[[u,o.tempProduct.imageUrl]])])]),t("div",Y,[Z,t("input",{type:"file",id:"customFile",class:"form-control",ref:"fileInput",onBlur:e[1]||(e[1]=(...s)=>i.uploadFile&&i.uploadFile(...s))},null,544)]),t("img",{class:"img-fluid mb-3",src:o.tempProduct.imageUrl,alt:o.tempProduct.title},null,8,tt),et,Array.isArray(o.tempProduct.imagesUrl)?(n(),r("div",ot,[(n(!0),r(w,null,x(o.tempProduct.imagesUrl,(s,m)=>(n(),r("div",{class:"mb-1",key:m},[t("div",st,[t("div",lt,[dt,t("a",{class:"btn btn-sm btn-outline-danger text-decoration-none",onClick:A(_=>i.deleteImage(s),["prevent"])},"X ",8,it)]),a(t("input",{"onUpdate:modelValue":_=>o.tempProduct.imagesUrl[m]=_,type:"text",class:"form-control",placeholder:"請輸入圖片連結"},null,8,nt),[[u,o.tempProduct.imagesUrl[m]]])]),t("img",{class:"img-fluid",src:s},null,8,rt)]))),128)),!o.tempProduct.imagesUrl.length||o.tempProduct.imagesUrl[o.tempProduct.imagesUrl.length-1]?(n(),r("div",at,[t("button",{class:"btn btn-outline-primary btn-sm d-block w-100",onClick:e[2]||(e[2]=s=>o.tempProduct.imagesUrl.push(""))}," 新增圖片 ")])):(n(),r("div",ct,[t("button",{class:"btn btn-outline-danger btn-sm d-block w-100",onClick:e[3]||(e[3]=s=>o.tempProduct.imagesUrl.pop())}," 取消新增 ")]))])):(n(),r("div",ut,[t("button",{class:"btn btn-outline-primary btn-sm d-block w-100",onClick:e[4]||(e[4]=(...s)=>i.createImages&&i.createImages(...s))}," 新增圖片 ")]))]),t("div",mt,[t("div",pt,[ht,a(t("input",{"onUpdate:modelValue":e[5]||(e[5]=s=>o.tempProduct.title=s),id:"title",class:"form-control",placeholder:"請輸入標題",type:"text"},null,512),[[u,o.tempProduct.title]])]),t("div",_t,[t("div",bt,[gt,a(t("input",{"onUpdate:modelValue":e[6]||(e[6]=s=>o.tempProduct.category=s),id:"category",class:"form-control",placeholder:"請輸入分類",type:"text"},null,512),[[u,o.tempProduct.category]])]),t("div",Pt,[ft,a(t("input",{"onUpdate:modelValue":e[7]||(e[7]=s=>o.tempProduct.unit=s),id:"unit",class:"form-control",placeholder:"請輸入單位",type:"text"},null,512),[[u,o.tempProduct.unit]])])]),t("div",vt,[t("div",yt,[Mt,a(t("input",{"onUpdate:modelValue":e[8]||(e[8]=s=>o.tempProduct.origin_price=s),id:"origin_price",class:"form-control",min:"0",placeholder:"請輸入原價",type:"number"},null,512),[[u,o.tempProduct.origin_price,void 0,{number:!0}]])]),t("div",Ut,[kt,a(t("input",{"onUpdate:modelValue":e[9]||(e[9]=s=>o.tempProduct.price=s),id:"price",class:"form-control",min:"0",placeholder:"請輸入售價",type:"number"},null,512),[[u,o.tempProduct.price,void 0,{number:!0}]])])]),wt,t("div",xt,[Vt,a(t("textarea",{"onUpdate:modelValue":e[10]||(e[10]=s=>o.tempProduct.description=s),id:"description",class:"form-control",placeholder:"請輸入產品描述",type:"text"},`
                `,512),[[u,o.tempProduct.description]])]),t("div",At,[It,a(t("textarea",{"onUpdate:modelValue":e[11]||(e[11]=s=>o.tempProduct.content=s),id:"description",class:"form-control",placeholder:"請輸入說明內容",type:"text"},`
                `,512),[[u,o.tempProduct.content]])]),t("div",$t,[t("div",Tt,[a(t("input",{"false-value":0,"true-value":1,"onUpdate:modelValue":e[12]||(e[12]=s=>o.tempProduct.is_enabled=s),id:"is_enabled",class:"form-check-input",type:"checkbox"},null,512),[[I,o.tempProduct.is_enabled]]),Dt])])])])]),t("div",Et,[Ct,t("button",{type:"button",class:"btn btn-primary",onClick:e[13]||(e[13]=s=>d.$emit("update-product",o.tempProduct))}," 確認 ")])])])],512)}const Bt=f(B,[["render",Nt]]),St={props:{tempProduct:{type:Object}},emits:["delete-product"],data(){return{modal:null}},methods:{openModal(){this.modal.show()},closeModal(){this.modal.hide()}},mounted(){this.modal=new k(this.$refs.modal)}},Ft={id:"delProductModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"delProductModalLabel","aria-hidden":"true"},Lt={class:"modal-dialog"},Ot={class:"modal-content border-0"},Gt=t("div",{class:"modal-header bg-danger text-white"},[t("h5",{id:"delProductModalLabel",class:"modal-title"},[t("span",null,"刪除產品")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),Ht={class:"modal-body"},Rt={class:"text-danger"},Wt={class:"modal-footer"},jt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Xt(d,e,l,h,o,i){return n(),r("div",Ft,[t("div",Lt,[t("div",Ot,[Gt,t("div",Ht,[v(" 是否刪除 "),t("strong",Rt,p(l.tempProduct.title),1),v(" 商品(刪除後將無法恢復)。 ")]),t("div",Wt,[jt,t("button",{type:"button",class:"btn btn-danger",onClick:e[0]||(e[0]=s=>d.$emit("delete-product",l.tempProduct.id))}," 確認刪除 ")])])])],512)}const qt=f(St,[["render",Xt]]),{VITE_API:b,VITE_API_PATH:g}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"benson-vue3",BASE_URL:"/Vue3-training-2022-Winter/Week6-7/dist/",MODE:"production",DEV:!1,PROD:!0},zt={components:{AdminProductModal:Bt,AdminProductDeleteModal:qt,ThePagination:T},data(){return{products:[],isEnabled:0,tempProduct:{imagesUrl:[]},isNew:!1,pagination:{},currentPage:1}},methods:{...y(E,["loadingState"]),...y(D,["pushMessage"]),getProducts(d=1){this.currentPage=d;const e=`${b}/api/${g}/admin/products?page=${d}`;this.loadingState(!0),this.$http.get(e).then(l=>{this.products=l.data.products,this.pagination=l.data.pagination,this.loadingState(!1)}).catch(l=>{this.loadingState(!1),this.pushMessage({style:"danger",title:"取得產品資料失敗",content:`${l.response.data.message}`})})},openModal(d,e){d==="new"?(this.isNew=!0,this.tempProduct={imagesUrl:[]},this.$refs.productModal.openModal()):d==="edit"?(this.isNew=!1,this.tempProduct={...e},this.$refs.productModal.openModal()):d==="delete"&&(this.tempProduct={...e},this.$refs.deleteProductModal.openModal())},updateProduct(){let d=`${b}/api/${g}/admin/product/${this.tempProduct.id}`,e="put";this.isNew===!0&&(d=`${b}/api/${g}/admin/product`,e="post"),this.$http[e](d,{data:this.tempProduct}).then(()=>{this.getProducts(this.currentPage),this.$refs.productModal.closeModal(),this.pushMessage({title:`${e==="put"?"更新":"新增"}產品成功`})}).catch(l=>{this.pushMessage({style:"danger",title:`${e==="put"?"更新":"新增"}產品失敗`,content:`${l.response.data.message}`})})},deleteProduct(d){const e=`${b}/api/${g}/admin/product/${d}`;this.$http.delete(e).then(()=>{this.$refs.deleteProductModal.closeModal(),this.getProducts(this.currentPage),this.pushMessage({title:"已刪除產品"})}).catch(l=>{this.pushMessage({style:"danger",title:"刪除產品失敗，請稍後再試",content:`${l.response.data.message}`})})}},mounted(){this.getProducts()}},Jt={class:"container my-4"},Kt=t("h2",{class:"text-center my-3"},"後台產品列表",-1),Qt={class:"text-end"},Yt={class:"table mt-4"},Zt=t("thead",null,[t("tr",null,[t("th",{width:"15%"},"分類"),t("th",{width:"35%"},"產品名稱"),t("th",{width:"15%"},"原價"),t("th",{width:"15%"},"售價"),t("th",{width:"10%"},"是否啟用"),t("th",{width:"10%"},"操作")])],-1),te={key:0,class:"material-symbols-outlined text-success"},ee={class:"btn-group"},oe=["onClick"],se=["onClick"];function le(d,e,l,h,o,i){const s=P("ThePagination"),m=P("AdminProductModal"),_=P("AdminProductDeleteModal");return n(),r("div",Jt,[Kt,t("div",Qt,[t("button",{class:"btn btn-primary me-4",onClick:e[0]||(e[0]=c=>i.openModal("new"))}," 建立新的產品 ")]),t("table",Yt,[Zt,t("tbody",null,[(n(!0),r(w,null,x(o.products,c=>(n(),r("tr",{key:c.id},[t("td",null,p(c.category),1),t("td",null,p(c.title),1),t("td",null,p(c.origin_price),1),t("td",null,p(c.price),1),t("td",null,[c.is_enabled===1?(n(),r("span",te," check_circle ")):M("",!0)]),t("td",null,[t("div",ee,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:V=>i.openModal("edit",c)}," 編輯 ",8,oe),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:V=>i.openModal("delete",c)}," 刪除 ",8,se)])])]))),128))])]),o.pagination.total_pages>1?(n(),$(s,{key:0,pages:o.pagination,onGetData:i.getProducts},null,8,["pages","onGetData"])):M("",!0),U(m,{ref:"productModal","is-new":o.isNew,product:o.tempProduct,onGetProducts:i.getProducts,onUpdateProduct:i.updateProduct},null,8,["is-new","product","onGetProducts","onUpdateProduct"]),U(_,{ref:"deleteProductModal","temp-product":o.tempProduct,onGetProducts:i.getProducts,onDeleteProduct:i.deleteProduct},null,8,["temp-product","onGetProducts","onDeleteProduct"])])}const ce=f(zt,[["render",le]]);export{ce as default};
