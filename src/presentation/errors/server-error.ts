export class ServerError extends Error {
  constructor () {
    super('Sever error')
    this.name = 'ServerError'
  }
}
