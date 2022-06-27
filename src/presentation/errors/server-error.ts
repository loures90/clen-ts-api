export class ServerError extends Error {
  constructor (stack: string) {
    super('Sever error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
