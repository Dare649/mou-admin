export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getStudents(context, data) {
    return await this.$axios.get('api/loans?page=' + data.page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async downloadSampleFile() {
    return await this.$axios({
      method: 'get',
      url: 'api/loans/sample',
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
  async importRecord(context, data) {
    return await this.$axios.post('/api/loans/import', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
}

export const getters = {

}
