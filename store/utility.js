import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getCountries() {
    return await this.$axios.get('api/utilities/get-countries')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getStateByCountry(context, id) {
    return await this.$axios.get('api/utilities/get-state/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getLgaByState(context, id) {
    return await this.$axios.get('api/utilities/get-lga/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getFaculties() {
    return await this.$axios.get('api/utilities/get-faculties')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getDepartmentByFaculty(context, id) {
    return await this.$axios.get('api/utilities/get-departments/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async countPutmeStudent(){
    return await this.$axios.get('api/utilities/countPutmeStudents')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getAdmissionCategory() {
    return await this.$axios.get('api/utilities/admission-category')
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importUtilityAdmissionList(context, data) {
    return await this.$axios.post('/api/putme-sessions/admissions/import-utility', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importUtilityDeAdmissionList(context, data) {
    return await this.$axios.post('/api/de-sessions/admission-list/import-utility', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getProgramByDept(context, id) {
    return await this.$axios.get('/api/utilities/get-programs/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getSpecializationByProgram(context, id) {
    return await this.$axios.get('/api/utilities/get-specialization/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importPutmeImages(context, data) {
    return await this.$axios.post('/api/utilities/upload-putme-images', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async searchRRR(context, data) {
    return await this.$axios.post('/api/utilities/search-rrr', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async importReturningStudents(context, data) {
    return await this.$axios.post('/api/student/import-returning', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getSessionByEntryModeMode(context, data) {
    return await this.$axios.post('/api/utilities/get-session-by-mode', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getAllSession() {
    return await this.$axios.get('/api/get-all-sessions')
      .then(res =>{
        return res.data
      }).catch(err =>{
        return err
      })
  },
  async getCourseByProgram(context, data) {
    return await this.$axios.get('/api/utilities/get-courses?level=' + data.level + '&program=' + data.program)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
