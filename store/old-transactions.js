const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async importOldTransactionRecords(context, data) {
    return await this.$axios.post('/api/old-fees/import-old-fees', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async downloadSampleFile() {
    return await this.$axios({
      method: 'get',
      url: 'api/old-fees/download-sample',
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
  async uploadOLevelResults(context, data) {
    return await this.$axios.post('/api/old-waec/import', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async downloadSampleOlevelFile() {
    return await this.$axios({
      method: 'get',
      url: 'api/old-waec/download-sample',
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
