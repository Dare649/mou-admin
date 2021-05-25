import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async downloadSampleFile() {
    return await this.$axios.get('api/cec-sessions/download-sample')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async CecAcademicSession() {
    return await this.$axios.get('api/cec-sessions/getAcademicSession')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importCecAdmissionList(context, data) {
    return await this.$axios.post('/api/cec-sessions/import-admission', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
