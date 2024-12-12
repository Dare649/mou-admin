import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async downloadSampleFile() {
    return await this.$axios.get('api/mbs-sessions/admission/download-sample')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async mbsAcademicSession() {
    return await this.$axios.get('api/mbs-sessions/admission/get-sessions')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importMbsAdmissionList(context, data) {
    return await this.$axios.post('/api/mbs-sessions/admission/import-admission', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getMbsAdmissionList(context, data) {
    return await this.$axios.get('api/reports/mbs-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportMbsAdmissionList(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/mbs-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  }
}

export const getters = {

}
