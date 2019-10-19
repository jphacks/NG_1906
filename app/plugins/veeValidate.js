import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'

// ※Nuxtの場合はメモリリークの懸念があるので、injectをfalseにするのがよい
Vue.use(VeeValidate)
// エラーメッセージの表示言語をjaにするため、localeを設定
Validator.localize('ja', ja)
