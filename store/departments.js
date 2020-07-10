import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async uploadDepartments(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/departments/import',
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
    async exportDepartments(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/departments/export',
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
    async downloadDepartmentSampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/departments/download-template',
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
    async getDepartmentsByFacultyId(context, payload){
        return await this.$axios({
            method: 'get',
            url: 'api/departments/faculty/'+ payload.facultyId + '?page=' + payload.page,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async getDepartments(context){
        return await this.$axios({
            method: 'get',
            url: '/api/departments',
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async createDepartment(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/departments',
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
    async updateDepartment(context, payload) {
        return await this.$axios({
            method: 'put',
            url: 'api/departments/'+ payload.id,
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
    async deleteDepartment(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/departments/'+ id,
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
