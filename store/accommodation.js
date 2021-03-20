export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getAccommodation(context, page) {
    return await this.$axios.get('api/accommodation?page=' + page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getSession(context) {
    return await this.$axios.get('/api/accommodation/session')
      .then(res => {
        return res
      }).catch(err =>{
        return err
      })
  },
  async getSessionByEntryMode(context, data) {
    return await this.$axios.get('/api/accommodation/getSessionByEntryMode?entry_mode=' + data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async saveAccommodationRecord(context, data) {
    return await this.$axios.post('/api/accommodation/save', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async updateAccommodationRecord(context, data) {
    return await this.$axios.post('/api/accommodation/update/' + data.id, data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async deleteRecord(context, data) {
    return await this.$axios.delete('/api/accommodation/' + data.id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
