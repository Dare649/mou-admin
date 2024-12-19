

export const state = () => ({

});

export const mutations = () => ({

});


export const actions = {
    async mbsAcademicSession() {
        return await this.$axios.get('api/mbs-sessions/admission/get-sessions')
            .then(res => {
                return res
            }).catch(err => {
                return err
            })
    },
    
    async getAllMbsApplications(context, data) {
        return await this.$axios.get('api/mbs-sessions/admin/get-applications?session='+data.session+'&from='+data.from_date+'&to='+data.to_date+'&programme='+data.programme+'&course_of_study='+data.course_of_study+'&application_number='+data.application_number)
            .then(res => {
                return res
            }).catch(err => {
                return err
            })
    }
}

export const getters = {
    
}