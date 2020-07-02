import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async createUser(context, data) {
    return await this.$axios.post('api/users/create-admin-user', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async updateUser(context, data) {
    return await this.$axios.post('api/users/update-user', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
