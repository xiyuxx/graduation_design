import {Partner, Project, WorkItem} from "./project";
import {UserInfo} from "./user";
import {Article} from "./wiki";
import {Discuss, IComment, Reply} from "./topic";

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

type ProjectCollector = {
    collector:Project[]
}

type WorkItemCollector = {
    collector:WorkItem[]
}

type UserInfoCollector = {
    collector:UserInfo[]
}
type ArticleCollector = {
    collector:Article[]
}
type CommentCollector = {
    collector:IComment[]
}
type ReplyCollector = {
    collector:Reply[]
}
type DiscussCollector = {
    collector:Discuss[]
}

type PartnerCollector = {
    collector:Partner[]
}
type FailureResult = { Failure: null };
type RegisterResult = RegisterSuccessResult | FailureResult;
type SingleEditResult = SingleEditSuccessResult | FailureResult;
type AllProjectResult = ProjectCollector | FailureResult;
type AllWorkItemResult = WorkItemCollector | FailureResult;
type AllMemberResult = UserInfoCollector | FailureResult;
type AllArticleResult = ArticleCollector | FailureResult;
type AllCommentResult = CommentCollector | FailureResult
type AllReplyResult = ReplyCollector | FailureResult;
type AllDiscussResult = DiscussCollector | FailureResult;
type AllPartnerResult = PartnerCollector | FailureResult;