import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadPrograms(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/programs/import',
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
    async exportPrograms(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/programs/export',
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
    async downloadProgramSampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/programs/sample',
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
    async getProgramsByDepartmentId(context, payload){
        return await this.$axios({
            method: 'get',
            url: 'api/programs/department/'+ payload.departmentId + '?page=' + payload.page,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async createProgram(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/programs',
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
    async updateProgram(context, payload) {
        return await this.$axios({
            method: 'put',
            url: 'api/programs/'+ payload.id,
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
    async deleteProgram(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/programs/'+ id,
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
