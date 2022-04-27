const saveNumberInMenory = (type,array,changeVariable = false)=>{
    const typeArray = JSON.parse(localStorage.getItem(type))
    if(changeVariable){
        let newArray = [...typeArray]
        if(changeVariable === 'delete'){
          newArray = newArray.filter((element)=>{
              if(element[0]!==array[0]){
                  return element
              }
          })
          localStorage.setItem(type,JSON.stringify(newArray))
          return null   
        }
        else if(changeVariable ==='deleteAll'){
            localStorage.setItem(type,JSON.stringify(array))
            return null
        }
        newArray = newArray.map((element)=>{
            if(JSON.stringify(element[0])===JSON.stringify(array[0])){
                element = [...array]
                return element
            }
            else{
                return element
            }
        })
        localStorage.setItem(type,JSON.stringify(newArray))
        return null   
    }
    if(typeArray){
        let newArray = [...typeArray]
        let exit = false
        newArray.forEach((element)=>{
            if(JSON.stringify(element[0])===JSON.stringify(array[0])){
                exit = true
            }
        })
        if(exit){
            return false
        }
        newArray = [...newArray,array]
        localStorage.setItem(type,JSON.stringify(newArray))
    }
    else{
        localStorage.setItem(type,JSON.stringify([array]))
    }
    return true
}
export default saveNumberInMenory