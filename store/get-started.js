import axios from "axios";
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
    async getStatesByCountryId(context, id){
        return await this.$axios({
            method: 'get',
            url: 'api/states/country/'+ id,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
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
    async updateLGA(context, requests) {
        return await this.$axios({
            method: 'put',
            url: 'api/lgas/'+ requests.id + '?name=' + requests.name + '&country_id='+ requests.country_id + '&state_id='+ requests.state_id + '&code=' + requests.code,
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
    },
    async getCountries(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/countries',
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