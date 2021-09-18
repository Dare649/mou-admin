import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getAllStudents(context, data) {
    return await this.$axios.get('/api/student?matric_number=' + data.matric_number + '&jamb_number=' + data.jamb_number + '&page=' + data.page)
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
  }
}

export const getters = {

}
