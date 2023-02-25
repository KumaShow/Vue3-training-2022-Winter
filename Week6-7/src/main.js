/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import CKEditor from "@ckeditor/ckeditor5-vue";
// 匯入 vee-validate 主套件
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
// 匯入 vee-validate 相關規則
import {
  required,
  email,
  min,
  max_value,
  min_value,
} from "@vee-validate/rules";
// 匯入多國語系的功能
import { localize, setLocale } from "@vee-validate/i18n";
// 匯入繁體中文語系檔案
// import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import zhTW from "./assets/utils/zh_TW.json";
// SweetAlert 2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./assets/stylesheet/main.scss";
import "bootstrap";
import App from "./App.vue";
import router from "./router";

// 定義驗證規則
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max_value", max_value);
defineRule("min_value", min_value);

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 強制設定預設語系
setLocale("zh_TW");

const app = createApp(App);
const pinia = createPinia();

app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);

app.use(CKEditor);
app.use(VueSweetalert2);
app.use(VueAxios, axios);
app.use(pinia);
app.use(router);

app.mount("#app");
