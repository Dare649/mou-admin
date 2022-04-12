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
}

export const getters = {

}
