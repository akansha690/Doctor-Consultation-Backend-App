

abstract class AppError extends Error{
    
    constructor(message:string){
        super(message)
    }

}

export class InternalServerError extends AppError{
    name:string;
    statusCode:number;
    constructor(message: string){
        super(message)
        this.name="InternalServerError";
        this.statusCode=500;
    }
}


export class BadRequestError extends AppError {
    statusCode: number;
    name: string;
    constructor(message: string) {
        super(message)
        this.statusCode = 400;
        this.name = "BadRequestError";
    }
}


export class NotFoundError extends AppError {
    statusCode: number;
    name: string;
    constructor(message: string) {
        super(message)
        this.statusCode = 404;
        this.name = "NotFoundError";
    }
}

export class UnauthorizedError extends AppError {
    statusCode: number;
    name: string;
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
        this.name = "UnauthorizedError";
    }
}



export class ForbiddenError extends AppError {
    statusCode: number;
    name: string;
    constructor(message: string) {
        super(message);
        this.statusCode = 403;
        this.name = "ForbiddenError";
    }
}


export class ConflictError extends AppError {
    statusCode: number;
    name: string;
    constructor(message: string) {
        super(message);
        this.statusCode = 409;
        this.name = "ConflictError";
    }
}


export class NotImplementedError extends AppError {
    statusCode: number;
    name: string;
    constructor(message: string) {
        super(message);
        this.statusCode = 501;
        this.name = "NotImplementedError";
    }
}