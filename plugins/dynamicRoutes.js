import axios from 'axios'

export const dynamicRoutes = async () => {

  const resForDepartments = await axios.get('https://portal.olsslekki.org/api/faculties/getAllFaculties', {params: {size: 100}});
  const resForProgrammes = await axios.get('https://portal.olsslekki.org/api/departments/getAllDepartments');
  const resForLgas = await axios.get('https://portal.olsslekki.org/api/states/getAllStates', {params: {size: 100}});

  const routesForDepartments = resForDepartments.data.data.map((faculty) => {
    return {
      route: `/get-started/departments/${faculty.id}`,
      payload: faculty
    }
  })

  const routesForProgrammes = resForProgrammes.data.data.map((department) =>{
    return {
      route: `/get-started/programs/${department.id}`,
      payload: department
    }
  })

  const routesForLgas = resForLgas.data.data.map((state) => {
    return {
      route: `/get-started/lgas/${state.id}`,
      payload: state
    }
  })

  return routesForDepartments.concat(routesForLgas, routesForProgrammes)
}
