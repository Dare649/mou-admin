import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async exportJambResults(context, payload) {
      return await this.$axios({
        method: 'get',
        url: 'api/jamb-results/de/export?year='+data.year,
        headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
        responseType: "arraybuffer"
      }).then(res =>{
        return res
      }).catch(err =>{
        return err
      })
    },
    async downloadJambResultSampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/jamb-results/de/download-sample',
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
    async deleteJambDE(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/jamb-results/de/'+ id,
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
    async updateJambResult(context, requests) {
        return await this.$axios({
            method: 'put',
            url: 'api/jamb-results/de/'+requests.id +'?registration_number='+requests.registration_number+'&candidate_name='+requests.candidate_name+'&gender='+requests.gender+'&state_id='+requests.state_id+'&lga_id='+requests.lga_id+'&course_name='+requests.course_name+'&year='+requests.year+'&department_id=' + requests.department_id,
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
    async searchJambResults(context, payload) {
        return await this.$axios({
            method: 'get',
            url: 'api/jamb-results/de/search?registration_number='+payload.registration_number+'&year='+payload.year,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async getJambResults(context, payload) {
        return await this.$axios({
            method: 'get',
            url: 'api/jamb-results/de'+'?registration_number='+ payload.registration_number + '&year='+ payload.year +'&page='+ payload.page,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async uploadJambResults(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/jamb-results/de/import',
            data: requests,
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
