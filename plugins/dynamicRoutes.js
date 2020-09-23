import axios from 'axios'

export const dynamicRoutes = async () => {

  const resForDepartments = await axios.get('https://portal.olsslekki.org/api/departments');
  // console.log(resForDepartments);
  const resForLgas = await axios.get('https://portal.olsslekki.org/api/lgas');

  const routesForDepartments = resForDepartments.data.data.data.map((department) => {
    return {
      route: `/get-started/departments/${department.id}`,
      payload: department
    }
  })

  const routesForLgas = resForLgas.data.data.data.map((lga) => {
    return {
      route: `/get-started/lgas/${lga.id}`,
      payload: lga
    }
  })

  return routesForDepartments.concat(routesForLgas)
}
