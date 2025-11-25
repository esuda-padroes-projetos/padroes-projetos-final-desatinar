import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const empresasAPI = {
  listar: () => api.get('/empresas'),
  buscar: (id) => api.get(`/empresas/${id}`),
  criar: (data) => api.post('/empresas', data),
}

export const duplicatasAPI = {
  listar: () => api.get('/duplicatas'),
  buscar: (id) => api.get(`/duplicatas/${id}`),
  criar: (data) => api.post('/duplicatas', data),
  avancar: (id) => api.put(`/duplicatas/${id}/avancar`),
}

export default api
