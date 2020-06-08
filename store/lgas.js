import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadLGAs(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/lgas/import',
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
    async exportLGAs(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/lgas/export',
            headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            responseType: "arraybuffer"
        })
        .then(function (response) {
            //handle success
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async downloadLGASampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/lgas/download-sample',
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
    async getLGAsByStateId(context, id){
        return await this.$axios({
            method: 'get',
            url: 'api/lgas/state/'+ id,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async createLGA(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/lgas',
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
    async deleteLGA(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/lgas/'+ id,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            //handle success
            return response.data
        })
        .catch(err => {
            return err
        });
    }
}

export const getters = {

}
