const state = {
    type: null,
    message: null
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }, message) {
        commit('success', message);
    }
};

const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'alert alert-danger alert-dismissible fade show';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
};

const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
export default alert
