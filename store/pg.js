import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async downloadSampleFile() {
    return await this.$axios.get('api/pg-sessions/admission/download-sample')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async PgAcademicSession() {
    return await this.$axios.get('api/pg-sessions/getSessions')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importPgAdmissionList(context, data) {
    return await this.$axios.post('/api/pg-sessions/admission/import-admission', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getAllPgApplications(context, data) {
    return await this.$axios.get('api/pg-sessions/admin/get-applications?session='+data.session+'&entry_mode='+data.entry_mode+'&faculty='+data.faculty+'&department='+data.department+'&program='+data.program+'&pan='+data.pan+'&from='+data.from_date+'&to='+data.to_date+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
