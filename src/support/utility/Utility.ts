import moment from "moment/moment";

export const getErrorMessage = function (e:any) {
    if (e) {
        if (e instanceof Error){
            return (<Error>e).message
        }else{
            return e
        }
    }else{
        return "unexpected error"
    }
}

export const getCurrentTimeStamp = function (){
    return  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
}