export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getSession(context, page) {
    return await this.$axios.get('/api/student-acad-session?page=' + page)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async saveSession(context, data) {
    return await this.$axios.post('/api/student-acad-session', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async updateSession(context, data) {
    return await this.$axios.post('/api/student-acad-session/' + data.id, data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async changeSessionStatus(context, data) {
    return await this.$axios.get('/api/student-acad-session/change-status/' + data.id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getSessionById(context, data) {
    return await this.$axios.get('/api/student-acad-session/' + data.id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async deleteSession(context, data) {
    return await this.$axios.delete('/api/student-acad-session/' + data.id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
