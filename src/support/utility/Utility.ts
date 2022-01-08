export const getErrorMessage = function (e:any) {
    if (e instanceof Error) {
        return (<Error>e).message
    }else{
        return "unexpected error"
    }
}