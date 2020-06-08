import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadReligions(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/religions/import',
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
    async exportReligions(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/religions/export',
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
    async downloadReligionSampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/religions/download-template',
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
    async createReligion(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/religions',
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
    async updateReligion(context, payload) {
        return await this.$axios({
            method: 'put',
            url: 'api/religions/'+ payload.id,
            data: qs.stringify(payload.bodyFormData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        })
        .then(function (response) {
            //handle success
            return response.data
        })
        .catch(err => {
            console.log(err)
            return err
        });
    },
    async deleteReligion(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/religions/'+ id,
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
    async getReligions(context, page) {
        return await this.$axios({
            method: 'get',
            url: 'api/religions?page='+page,
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
