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
    async exportDEs(context, payload) {
        return await this.$axios.post('api/de-sessions/de-result/export', {
            }, {
            responseType: 'blob',
            data: payload
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', "des")
            document.body.appendChild(link)
            link.click()
            return true
        });
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
