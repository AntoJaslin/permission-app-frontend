export class FeedbackPriority{
    typeId:number;
    typeName:string;  
}

export class CreateAndEditFeedBack{
    commentId?:number
    siteID:number;
    userID:number;
    CaseId:number;
    feedBackId?:number;
    description:string;
    actionDate:string;
    feedBackType:number;
}

export class ReadAndDeleteFeedback{
    CaseId?:number;
    feedBackId?:number
}

export class FeedbackTableData{
    priority:string
    description?:string;
    actionDate?:string;
    revisedOn?:string;
    feedbackStatusText?:string;
}