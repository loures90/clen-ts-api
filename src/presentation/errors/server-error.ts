export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal Sever error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
