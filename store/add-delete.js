export const state = () => ({

});

export const mutations = {

}

export const actions = {
  async searchStudent(context, data) {
    return await this.$axios.get('api/student/course-registrations?student_id=' + data.student_id + '&session_id=' + data.session_id + '&level_id=' + data.level_id)
      .then((res) =>{
        return res
      }).catch((err) =>{
        return err
      })
  },
  async deleteCourse(context, id) {
    return await this.$axios.delete('api/student/course-registrations/' + id)
      .then((res) =>{
        return res
      }).catch((err) =>{
        return err
      })
  },
  async addCourse(context, data) {
    return await this.$axios.post('/api/student/course-registrations', data)
      .then((res) =>{
        return res
      }).catch((err) =>{
        return err
      })
  }
}

export const getters = {

}
