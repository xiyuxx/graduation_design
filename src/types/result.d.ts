export interface ReqResult<T>{
    data:T,
    msg:string,
    success:boolean,
    status:string
}
type RegisterSuccessResult = {
    Success: {
        name: string,
        id: string,
        org_id:string,
        org_name:string
    }
}
type SingleEditSuccessResult = {
    Success:string,
}
type FailureResult = { Failure: null };
type RegisterResult = RegisterSuccessResult | FailureResult;
type SingleEditResult = SingleEditSuccessResult | FailureResult;