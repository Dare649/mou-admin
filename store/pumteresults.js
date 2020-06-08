import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadPUTMEResults(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/putme-sessions/post-utme-result/import',
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
    async exportPUTMEs(context, payload) {
       
        return await this.$axios.post('api/putme-sessions/post-utme-result/export', {
            
        }, {
            responseType: 'blob',
            data: payload
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', "putmes")
            document.body.appendChild(link)
            link.click()
            return true
        });

        // return await this.$axios({
        //     method: 'post',
        //     url: 'api/putme-sessions/post-utme-result/export',
        //     data: payload,
        //     headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
        //     responseType: "arraybuffer",
            
        // })
        // .then(function (response) {
        //     //handle success
        //     return response.data
        // })
        // .catch(err => {
        //     return err
        // });
    },
    async downloadPUTMESampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/putme-sessions/post-utme-result/download-sample',
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
    async getAcademicSessions(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/putme-sessions',
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    }
}

export const getters = {

}
