import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async GetReparationStudents(context, data) {
    return await this.$axios.get('api/reparation/reports?matriculation_number=' + data.matriculation_number +
      '&transaction_reference_no=' + data.transaction_reference_no + '&from_date=' + data.from_date + '&to_date=' + data.to_date + '&export=' + data.export + '&page='+data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async ExportReparationFee(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/reparation/reports?matriculation_number=' + data.matriculation_number +
        '&transaction_reference_no=' + data.transaction_reference_no + '&from_date=' + data.from_date + '&to_date=' + data.to_date + '&export=' + data.export + '&page='+data.page,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
}

export const getters = {

}
