export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getEmailRequest(context, data) {
    return await this.$axios.get('api/student-email-request?page=' + data.page + '&registration_number=' + data.reg_num)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async exportEmailRequest(context) {
    return await this.$axios({
      method: 'get',
      url: 'api/student-email-request/export',
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async uploadStudentEmails(context, data) {
    return await this.$axios({
      method: 'post',
      url: 'api/student-email-request/import',
      data: data,
      headers: {'Content-Type': 'application/json' }
    })
      .then((response) => {
        //handle success
        return response
      })
      .catch(err => {
        return err
      });
  },
  async downloadSample(context) {
    return await this.$axios({
      method: 'get',
      url: 'api/student-email-request/download-sample',
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
}

export const getters = {

}
