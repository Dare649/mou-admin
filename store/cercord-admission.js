import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async downloadSampleFile() {
    return await this.$axios.get('api/cercord-sessions/admission/download-sample')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async cercordAcademicSession() {
    return await this.$axios.get('api/cercord-sessions/admission/get-sessions')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importCercordAdmissionList(context, data) {
    return await this.$axios.post('/api/cercord-sessions/admission/import-admission', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
