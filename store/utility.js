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
}

export const getters = {

}
