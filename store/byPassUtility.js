import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async downloadSample() {
    return await this.$axios.get('api/by-pass-utility/sample')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async uploadByPassUtility(context, data) {
    return await this.$axios.post('api/by-pass-utility/import', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
