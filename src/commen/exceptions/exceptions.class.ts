export class UnauthorizedError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.name = 'UnauthorizedError';
	  this.statusCode = 401;
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  export class ForbiddenError extends Error {
	  statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 403;
	  this.name = "ForbiddenError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  export class NotFoundError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 404;
	  this.name = "NotFoundError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  export class ValidationError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 400;
	  this.name = "ValidationError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  export class PropertyRequiredError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 400;
	  this.name = "PropertyRequiredError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  // resource was not created custom error
  export class ResourceNotCreatedError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 400;
	  this.name = "ResourceNotCreatedError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  export class ResourceNotUpdatedError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 404;
	  this.name = "ResourceNotUpdatedError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  export class ResourceNotDeletedError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 400;
	  this.name = "ResourceNotDeletedError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  // empty request body custom error
  export class EmptyRequestBodyError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 400;
	  this.name = "EmptyRequestBodyError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  // unexpected error custom error
  export class UnexpectedError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 500;
	  this.name = "UnexpectedError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  // bad request custom error
  export class BadRequestError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 400;
	  this.name = "BadRequestError";
	  this.stack = (<any> new Error()).stack;
	}
  }
  
  // Invalid Credentials custom error
  export class InvalidCredentialsError extends Error {
	statusCode: number;
	constructor (message: string) {
	  super(message);
	  this.statusCode = 400;
	  this.name = "InvalidCredentialsError";
	  this.stack = (<any> new Error()).stack;
	}
  }