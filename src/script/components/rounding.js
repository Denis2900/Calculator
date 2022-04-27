const rounding = (string)=>{
    string = string.slice(0,10)
    let index = 0
    if(string.includes('.')){
        for(let i = string.length-1; i >-1;i--){
            if(Number(string[i])===0){
                index = i
            }
            else{
                i = -1
            }
        }
        if(index!==0){
            string = string.slice(0,index)
        }
        if(string[string.length-1]==='.'){
            string = string.slice(0,string.length-1)
        }
    }
    return string
}
export default rounding