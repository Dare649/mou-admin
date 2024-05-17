import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async GetReparationStudents(context, data) {
    return await this.$axios.get('api/reparation/reports?matriculation_number=' + data.matriculation_number +
      '&transaction_reference_no=' + data.transaction_reference_no + '&from_date=' + data.from_date + '&to_date=' + data.to_date +
      '&export=' + data.export + '&page='+data.page + '&status=' + data.status)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async DeleteReparation(context, data) {
    console.log(data)
    return await this.$axios.delete('api/reparation/reports/destroy?transaction_reference_no=' + data.transaction_reference_no)
      .then(res =>{
        return res
      }).catch(err => {
        return err
      })
  },
  async ExportReparationFee(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reparation/reports?matriculation_number=' + data.matriculation_number +
        '&transaction_reference_no=' + data.transaction_reference_no + '&from_date=' + data.from_date + '&to_date=' + data.to_date + '&export='
        + data.export + '&page='+data.page + '&status=' + data.status,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async GetForm(context, data) {
    return await this.$axios.get('api/reparation/reports/get-form?matriculation_number=' + data.matriculation_number)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
}

export const getters = {

}
