import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getRegisteredStudents(context, data) {
    return await this.$axios.get('api/putme-sessions/registered-students?year=' + data.year + '&page=' + data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
