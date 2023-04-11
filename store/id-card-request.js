export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getIdCardRequest(context, data) {
    return await this.$axios.get('api/student-id-request/view-all?page=' + data.page + '&matriculation_number=' + data.matriculation_number + '&status=' + data.status + '&date=' + data.date + '&export=' + data.export)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async downloadSample(context) {
    return await this.$axios({
      method: 'get',
      url: 'api/student-id-request/download-sample',
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
  async exportRes(context, data) {
    return await this.$axios({
      method: 'get',
      url: 'api/student-id-request/view-all?page=' + data.page + '&matriculation_number=' + data.matriculation_number + '&status=' + data.status + '&date=' + data.date + '&export=' + data.export,
      headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      responseType: "arraybuffer"
    }).then(res =>{
      return res
    }).catch(err =>{
      return err
    })
  },
  async importStudent(context, data) {
    return await this.$axios({
      method: 'post',
      url: 'api/student-id-request/import',
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
  async deleteReq(context, id) {
    return await this.$axios.delete('api/student-id-request/' + id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
