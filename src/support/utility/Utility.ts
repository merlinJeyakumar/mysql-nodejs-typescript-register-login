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