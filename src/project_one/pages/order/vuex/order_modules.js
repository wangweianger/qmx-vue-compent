
import { INIT_STORE,ALERT_SOMETHING } from './mutation-types'

// 需要维护的状态
const state = {
  notes: [],
  activeNote: {},
  show: '',
  number:'这里是我的number'
};

const mutations = {
    // 初始化 state
    [INIT_STORE](state, data) {
    	state.number = data.number;
    },
    //弹出一些东西
    [ALERT_SOMETHING](state,mun) {
      console.log(mun)
      state.number="我 变 了 额"
    },

};

export default {
  state,
  mutations
}

