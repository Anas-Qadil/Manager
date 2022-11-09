export {}

declare global {
  namespace Express {
    export interface Request {
	  log?: any
    }
  }
}