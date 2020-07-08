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
    async uploadPUTMEResults(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/putme-sessions/post-utme-result/import',
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
    async uploadSubjects(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/subjects/import',
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
    async exportPUTMEs(context, payload) {

        return await this.$axios.post('api/putme-sessions/post-utme-result/export', {

        }, {
            responseType: 'blob',
            data: payload
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', "putmes")
            document.body.appendChild(link)
            link.click()
            return true
        });

        // return await this.$axios({
        //     method: 'post',
        //     url: 'api/putme-sessions/post-utme-result/export',
        //     data: payload,
        //     headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
        //     responseType: "arraybuffer",

        // })
        // .then(function (response) {
        //     //handle success
        //     return response.data
        // })
        // .catch(err => {
        //     return err
        // });
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
    async exportJambResults(context, requests) {
        return await this.$axios.post('api/jamb-results/export', {

        }, {
            responseType: 'blob',
            data: requests
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', "utmes")
            document.body.appendChild(link)
            link.click()
            return true
        });
        // return await this.$axios({
        //     method: 'post',
        //     data: requests,
        //     url: 'api/jamb-results/export',
        //     headers: {'Content-Type': 'application/json' },
        //     responseType: "arraybuffer"
        // })
        // .then(function (response) {
        //     //handle success
        //     return response.data
        // })
        // .catch(err => {
        //     return err
        // });
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
    async exportSubjects(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/subjects/export',
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
    async downloadPUTMESampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/putme-sessions/post-utme-result/download-sample',
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
    async downloadSubjectSampleFile(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/subjects/download-template',
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
    async getStatesByCountryId(context, countryId){
        return await this.$axios({
            method: 'get',
            url: 'api/states/country/'+ countryId,
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
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
    async createSubject(context, requests) {
        return await this.$axios({
            method: 'post',
            url: 'api/subjects',
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
    async updateJambResult(context, requests) {
        return await this.$axios({
            method: 'put',
            url: 'api/jamb-results/'+ requests.id + '?registration_number=' +
                                requests.registration_number + '&name=' + requests.name + '&sex=' +
                                requests.sex + '&state_id=' + requests.state_id + '&lga_id=' + requests.lga_id + '&university1=' +
                                requests.university1 + '&faculty_id1=' + requests.faculty_id1 + '&department_id1=' +
                                requests.department_id1 + '&university2=' + requests.university2 + '&faculty_id2=' +
                                requests.faculty_id2 + '&department_id2=' + requests.department_id2 + '&subject_id1=' +
                                requests.subject_id1 + '&mark1=' + requests.mark1 + '&subject_id2=' + requests.subject_id2 + '&mark2=' +
                                requests.mark2 + '&subject_id3=' + requests.subject_id3 + '&mark3=' + requests.mark3 + '&subject_id4=' +
                                requests.subject_id4 + '&mark4=' + requests.mark4 + '&year=' + requests.year,
            headers: {'Content-Type': 'application/json' }
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
    async updateSubject(context, payload) {
        return await this.$axios({
            method: 'put',
            url: 'api/subjects/'+ payload.id,
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
    async getUserDetails(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/me',
            headers: {'Content-Type': 'application/json' }
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
    async deleteSubject(context, id){
        return await this.$axios({
            method: 'delete',
            url: 'api/subjects/'+ id,
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
    async getCountries(context, page) {
        return await this.$axios({
            method: 'get',
            url: 'api/countries?page='+page,

        })
        .then(function (response) {
            return response.data
        })
        .catch(err => {
            return err
        });
    },
    async getAcademicSessions(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/putme-sessions/getSessions',
            headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
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
    },
    async getJambResults(context, payload) {
        return await this.$axios({
            method: 'get',
            url: 'api/jamb-results?registration_number='+ payload.registration_number + '&year='+ payload.year +'&page='+ payload.page,
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
    },
    async getSubjects(context, page) {
        return await this.$axios({
            method: 'get',
            url: 'api/subjects?page=' + page,
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
    async getAcademicTypes(context) {
        return await this.$axios({
            method: 'get',
            url: 'api/academic-type',
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
