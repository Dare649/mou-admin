import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadJambResults(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/jamb-results/import',
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
    async exportJambResults(context, requests) {
        return await this.$axios({
            method: 'post',
            data: requests,
            url: 'api/jamb-results/export',
            headers: {'Content-Type': 'application/json' },
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
    async downloadJambResultSampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/jamb-results/download-sample',
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
            data: requests,
            url: 'api/jamb-results',
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
    async deleteJambResult(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/jamb-results/'+ id,
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
    async getJambResults(context, payload) {
        return await this.$axios({
            method: 'get',
            url: 'api/jamb-results/'+ payload.year +'?page='+ payload.page,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async searchJambResults(context, payload) {
        return await this.$axios({
            method: 'get',
            url: 'api/jamb-results/search/'+ payload.registration_number,
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
