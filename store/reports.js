import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getAcceptanceStudents(context, data) {
    return await this.$axios.get('api/reports/accepted-admission?registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportAcceptanceStudents(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/accepted-admission?registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getAdmissionList(context, data) {
    return await this.$axios.get('api/reports/admitted-candidates?registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportAdmissionList(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/admitted-candidates?registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getAllSchoolFeesReport(context, data) {
    return await this.$axios.get('api/reports/school-fees?registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getTransactionReport(context, data) {
    return await this.$axios.get('api/reports/payments?trans_ref='+data.trans_ref+'&jamb_no='+data.jamb_no+'&department='+data.department+'&payment_type='+data.payment_type+'&from_dt='+data.from_dt+'&to_dt='+data.to_dt+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportTransactionReport(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/payments?trans_ref='+data.trans_ref+'&jamb_no='+data.jamb_no+'&department='+data.department+'&payment_type='+data.payment_type+'&from_dt='+data.from_dt+'&to_dt='+data.to_dt+'&export='+data.export+'&page='+data.page,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getRegisteredPutmeStudents(context, data) {
    return await this.$axios.get('api/putme/export-completed-registrations?registration_number='+data.registration_number+'&screening_id='+data.screening_id+'&session_id='+data.session_id+'&department_id='+data.department_id+'&entry_mode='+data.entry_mode+'&from='+data.from+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportRegisteredPutmeStudents(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/putme/export-completed-registrations?registration_number='+data.registration_number+'&screening_id='+data.screening_id+'&session_id'+data.session_id+'&department_id='+data.department_id+'&entry_mode='+data.entry_mode+'&from='+data.from+'&to='+data.to+'&export='+data.export,
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
