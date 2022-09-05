import schemas from './schemas-container'
import paths from './paths-container'
import components from './components-container'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Api de Enquetes para programadores',
    description: 'Curso Manguinho',
    version: '1.0.0'
  },
  license: {
    name: '',
    url: ''
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  },
  {
    name: 'Enquete'
  }],
  paths,
  schemas,
  components
}
