import axios from "axios";
const qs = require('qs')

export const state = () => ({

});

export const mutations = {

}

export const actions = {
    async createRole(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/auth/role',
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
    async updateRolePermissions(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/auth/role/sync-permissions',
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
    async updateUserRoles(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/auth/user/sync-roles',
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
    async updateUserPermissions(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/auth/user/sync-permissions',
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
    async updateRole(context, payload) {
        return await this.$axios({
            method: 'put',
            url: 'api/auth/role/'+ payload.id+ '?role_name='+ payload.role_name,
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
    async getPermissions(context, page) {
        return await this.$axios({
            method: 'get',
            url: 'api/auth/permissions?page='+page,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async getRoleUsers(context, id) {
        return await this.$axios({
            method: 'get',
            url: 'api/auth/role/'+id,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async getRolePermissions(context, id) {
        return await this.$axios({
            method: 'get',
            url: 'api/auth/role/permissions/'+id,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async getRoles(context, req) {
        return await this.$axios({
            method: 'get',
            url: 'api/auth/roles?page='+req.page+'&page='+req.pager,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async getUserRoles(context, req) {
        return await this.$axios({
            method: 'get',
            url: 'api/auth/user/roles/'+req.id,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async getAllUsers(context, page) {
        return await this.$axios({
            method: 'get',
            url: 'api/users?page='+page,
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
