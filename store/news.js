import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async getAllNews(context, data) {
    return this.$axios.get('/api/news?page='+ data.page+'&title='+data.title+'&from='+data.from+'&to='+data.to)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async getNewsDetail(context, slug) {
    return this.$axios.get('/api/news/details?slug='+slug)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async saveNews(context, data) {
    return this.$axios.post('/api/news/save', data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async updateNews(context, data) {
    return this.$axios.post('/api/news/update/' + data.id, data)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  },
  async deleteNews(context, data) {
    return this.$axios.delete('/api/news/' + data.id)
      .then(res =>{
        return res
      }).catch(err =>{
        return err
      })
  }
}

export const getters = {

}
