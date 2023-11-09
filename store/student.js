import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getAllStudents(context, data) {
    return await this.$axios.get('/api/student/search?matric_number=' + data.matric_number + '&jamb_number=' + data.jamb_number + '&page=' + data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async updateBioData(context, data) {
    return await this.$axios.post('api/student/update', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async changeDePlacementLevel(context, data) {
    return await this.$axios.post('api/de-sessions/change-level', data)
      .then((res) => {
        return res
      }).catch((err) => {
        return err
      })
  },
  async changeStudentLevel(context, data) {
    return await this.$axios.post('api/student/change-level', data)
      .then((res) =>{
        return res
      }).catch((err) =>{
        return err
      })
  },
  async getStudentByMatNo(context, data) {
    return await this.$axios.get('api/student/get-by-mat-no?matriculation_number=' + data.matriculation_number)
      .then((res) =>{
        return res
      }).catch((err) =>{
        return err
      })
  },
  async changeAllStudentLevels(context, data) {
    return await this.$axios.get('api/student/change-all-student-levels?program=' + data.program)
      .then((res) =>{
        return res
      }).catch((err) => {
        return err
      })
  },
  async revertChanges(context) {
    return await this.$axios.get('api/student/revert-all-student-levels')
      .then((res) =>{
        return res
      }).catch((err) => {
        return err
      })
  },
  async importTransferStudents(context, data) {
    return await this.$axios.post('/api/transfer-student/import', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async downloadSampleFile(context) {
    return await this.$axios({
      method: 'get',
      url: 'api/transfer-student/download-sample',
      headers: {'Content-Type': 'application/json' }
    })
      .then(function (response) {
        //handle success
        return response.data
      })
      .catch(err => {
        return err
      });
  },
  async submitWaiver(context, data) {
    return await this.$axios.post('/api/utilities/student-waiver', data)
      .then(res => {
        return res
      }).catch(err => {
        return err
      })
  },
  async submitSUG(context, data) {
    return await this.$axios.post('/api/utilities/submit-sug-dues', data)
      .then(res => {
        return res
      }).catch(err => {
        return err
      })
  }
}

export const getters = {

}
