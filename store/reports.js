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
  }
}

export const getters = {

}
