import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getRegisteredStudents(context, data) {
    return await this.$axios.get('api/putme-sessions/registered-students?year=' + data.year + '&page=' + data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importRegisteredPUTME(context, data) {
    return await this.$axios.post('/api/putme/import-putme', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importUtilityPutmeResults(context, data) {
    return await this.$axios.post('/api/import-ssce-results', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importUtilityDEResults(context, data) {
    return await this.$axios.post('/api/import-de-results', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
