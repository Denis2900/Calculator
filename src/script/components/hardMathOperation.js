import rounding from "./rounding"
import {evaluate}  from "mathjs"
import saveNumberInMenory from "./saveNumberInMemory"
const hardMathOperation = (string)=>{
    let radiansOrDegree = document.querySelector('#radians-or-degree')
    const array = ['sin','cos','tan']
    if(radiansOrDegree.textContent==='Rad'){
        array.forEach((key)=>{
            if(string.includes(key)){
                string = string.replace(RegExp(key,'ig'),key+'@')
                string = degreeTrigonometry(string)
            }
        })
    }
    try {
        let historyString = string
        string = evaluate(string)
        string = string.toFixed(9)
        string = rounding(string)
        historyString += `= ${string}`
        saveNumberInMenory('history',[historyString])
        return string
    } catch (error) {
        return false
    }
}
const degreeTrigonometry = (string)=>{
    string = string.split('')
    let startIndex = string.indexOf('@')
    let endIndex = 0
    let openBrackets = 0
    let closeBrackets = 0
    for(let i = startIndex; i < string.length;i++){
        if(string[i] === '('){
            openBrackets++
        }
        if(string[i]===')'){
            closeBrackets++
        }
        if(openBrackets===closeBrackets && openBrackets!==0){
            endIndex=i
            break
        }
    }
    let arr = []
    string.forEach((elem,index)=>{
        if(index !== endIndex){
            arr.push(elem)
        }
        else{
            arr.push(')deg)')
        }
    })
    arr = arr.join('')
    arr = arr.replace('@','(')
    if(arr.includes('@')){
        return degreeTrigonometry(arr)
    }
    return arr
}
export default hardMathOperation