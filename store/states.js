import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadStates(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/states/import',
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
    async exportStates(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/states/export',
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
    async downloadStateSampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/states/download-sample',
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
    async getStatesByCountryId(context, payload){
        return await this.$axios({
            method: 'get',
            url: 'api/states/country/'+ payload.countryId + '?page=' + payload.current_page,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async createState(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/states',
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
    async updateState(context, requests) {
        return await this.$axios({
            method: 'put',
            url: 'api/states/'+ requests.id + '?name=' + requests.name + '&country_id='+ requests.country_id  + '&code=' + requests.code,
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
    async deleteState(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/states/'+ id,
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
