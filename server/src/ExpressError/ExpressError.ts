export class ExpressError extends Error {
  status: number; //adds the property status in ExpressError
  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}
