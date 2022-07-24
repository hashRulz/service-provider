export class Chat{
    user: string;
    message: string;
    ms_id: number;
    sender:any;
    content:any;
    t_stamp:any;

    constructor(user:string, message:string ){
        this.user = user;
        this.message =message;
    }
}