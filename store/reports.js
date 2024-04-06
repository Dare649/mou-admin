import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getAcceptanceStudents(context, data) {
    return await this.$axios.get('api/reports/accepted-admission?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportAcceptanceStudents(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/accepted-admission?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getPgAdmissionList(context, data) {
    return await this.$axios.get('api/reports/pg-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportPgAdmissionList(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/pg-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getCercordAdmissionList(context, data) {
    return await this.$axios.get('api/reports/cercord-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportCercordAdmissionList(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/cercord-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getAdmissionList(context, data) {
    return await this.$axios.get('api/reports/admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportAdmissionList(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getCecAdmissionList(context, data) {
    return await this.$axios.get('api/reports/cec-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportCecAdmissionList(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/cec-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getDeAdmissionList(context, data) {
    return await this.$axios.get('api/reports/de-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportDeAdmissionList(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/de-admitted-candidates?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getAllSchoolFeesReport(context, data) {
    return await this.$axios.get('api/reports/school-fees?session_id='+data.session_id +'&registration_number='+data.registration_number+'&department_id='+data.department_id+'&year='+data.year+'&from='+data.from+'&entry_mode='+data.entry_mode+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getTransactionReport(context, data) {
    return await this.$axios.get('api/reports/payments?session_id='+data.session_id +'&trans_ref='+data.trans_ref+'&jamb_no='+data.jamb_no+'&department='+data.department+'&payment_type='+data.payment_type+'&from_dt='+data.from_dt+'&to_dt='+data.to_dt+'&export='+data.export+'&page='+data.page+'&status='+data.status+'&model_type='+data.model_type)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportTransactionReport(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/payments?session_id='+data.session_id +'&trans_ref='+data.trans_ref+'&jamb_no='+data.jamb_no+'&department='+data.department+'&payment_type='+data.payment_type+'&from_dt='+data.from_dt+'&to_dt='+data.to_dt+'&export='+data.export+'&page='+data.page+'&model_type='+data.model_type,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async getRegisteredPutmeStudents(context, data) {
    return await this.$axios.get('api/putme/export-completed-registrations?session_id='+data.session_id +'&registration_number='+data.registration_number+'&screening_id='+data.screening_id+'&session_id='+data.session_id+'&department_id='+data.department_id+'&entry_mode='+data.entry_mode+'&from='+data.from+'&to='+data.to+'&export='+data.export+'&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportRegisteredPutmeStudents(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/putme/export-completed-registrations?session_id='+data.session_id +'&registration_number='+data.registration_number+'&screening_id='+data.screening_id+'&session_id'+data.session_id+'&department_id='+data.department_id+'&entry_mode='+data.entry_mode+'&from='+data.from+'&to='+data.to+'&export='+data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async exportCourseDownloadReport(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reports/course-download-report?session_id='+data.session_id +'&course_id=' + data.course_id + '&level_id=' + data.level_id + '&session_id=' + data.session_id,
      responseType: 'arraybuffer',
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
    })
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
