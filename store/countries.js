import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadCountries(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/countries/import',
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
    async exportCountries(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/countries/export',
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
    async downloadCountrySampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/countries/download-sample',
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
    async createCountry(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/countries',
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
    async updateCountry(context, requests) {
        return await this.$axios({
            method: 'put',
            url: 'api/countries/'+ requests.id + '?name=' + requests.name + '&iso2=' + requests.code + '&capital=' + requests.capital + '&phone_code=' + requests.phone_code + '&currency=' + requests.currency,
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
    async deleteCountry(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/countries/'+ id,
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
    async getCountries(context, page) {
        return await this.$axios({
            method: 'get',
            url: 'api/countries?page='+page,
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
