import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getUtmeSession() {
    return await this.$axios.get('api/putme-sessions/getSessions')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getDeSession() {
    return await this.$axios.get('api/de-sessions')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async markForDepartmentalApproval(context, data) {
    return await this.$axios.post('api/academic-session/marked-for-departmental-approval', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importPutmeSug(context, data) {
    return await this.$axios.post('api/putme-sessions/student-union-dues/import', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importDeSug(context, data) {
    return await this.$axios.post('api/de-sessions/student-union-dues/import', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getSession(context, data) {
    return await this.$axios.post('api/putme-sessions/get-sessions', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
