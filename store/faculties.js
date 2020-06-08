import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadFaculties(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/faculties/import',
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
    async exportFaculties(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/faculties/export',
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
    async downloadFacultySampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/faculties/download-template',
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
    async createFaculty(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/faculties',
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
    async updateFaculty(context, payload) {
        return await this.$axios({
            method: 'put',
            url: 'api/faculties/'+ payload.id,
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
    async deleteFaculty(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/faculties/'+ id,
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
    async getFaculties(context, page) {
        return await this.$axios({
            method: 'get',
            url: 'api/faculties?page='+page,
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
