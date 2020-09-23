import axios from 'axios'

export const dynamicRoutes = async () => {

  const resForDepartments = await axios.get('https://portal.olsslekki.org/api/departments', {params: {size: 100}});
  // console.log(resForDepartments);
  const resForLgas = await axios.get('https://portal.olsslekki.org/api/lgas', {params: {size: 100}});

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
