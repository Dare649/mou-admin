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
  },
  async getEntryMode() {
    return await this.$axios.get('/api/cec/entry-mode')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getApplications(context, data) {
    return await this.$axios.get('/api/cec-sessions/admin/get-applications?session='+data.session+'&entry_mode='+data.entry_mode+'&faculty='+data.faculty+'&department='+data.department+'&program='+data.program+'&can='+data.can+'&from='+data.from_date+'&to='+data.to_date)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getFaculties() {
    return await this.$axios.get('/api/cec-sessions/college-dept/get-faculty')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getDepartmentByFaculty(context, id) {
    return await this.$axios.get('/api/cec-sessions/college-dept/get-department/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },

  async getActiveSession() {
    return await this.$axios.get('api/cec/get-active-session')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getCecColleges(context, id) {
    return await this.$axios.get('api/utilities/cec-faculty/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getCecDepartments(context, id) {
    return await this.$axios.get('api/utilities/cec-department/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getCecPrograms(context, id) {
    return await this.$axios.get('api/utilities/cec-program/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },

  async saveSelection(context, data) {
    return await this.$axios.post('/api/cec-sessions/college-dept/save-selection', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importCecSug(context, data) {
    return await this.$axios.post('api/cec-sessions/student-union-dues/import', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async submitEditApplication(context, data) {
    return await this.$axios.post('api/cec/edit', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
