import axios from "axios";
export const state = () => ({
  
});

export const mutations = {

}

export const actions = {
    async login(context, loginData) {
        return await this.$axios({
                method: 'post',
                url: 'api/auth/login',
                data: loginData,
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