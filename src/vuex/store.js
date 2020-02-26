import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import axios from 'axios'
import router from '../router';
Vue.prototype.axios = axios;

const store = new Vuex.Store({
    state: {

    },
    mutations: {
        loginOut() {
            console.log("vuex中的退出");
            console.log("退出")
            axios.post('/rcpy/loginServlet?operation=logout').then(res => {
                if (res.data !== 1) return this.$message.error("退出失败")
                router.push({name: 'login'})
                sessionStorage.removeItem("id");
            })
           
        }
    },
    actions: {
        loginAction(context) {
            context.commit('loginOut')
        }
    }
})
export default store