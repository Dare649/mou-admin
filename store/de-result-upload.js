import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async downloadDEResultsSampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/de-sessions/de-result/sample',
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
    async exportDEResult(context, data) {
      return await this.$axios({
        method: 'get',
        url: 'api/de-sessions/de-result/export?session_id=' + data.session_id + '&department_id=' + data.department_id + '&college_id=' + data.college_id,
        headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
        responseType: "arraybuffer"
      }).then(res =>{
        return res
      }).catch(err => {
        return err
      })
    },
    async getAcademicSessions(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/de-sessions',
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async uploadDEResults(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/de-sessions/de-result/import',
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
