import animationWindow from "./animationWindow"
import hardMathOperation from "./hardMathOperation"
const addOnInput = (input,button,warningWindow,buttonText)=>{
    if(button.classList.contains('delete')){
        input.value = ''
        return null
    }
    if(button.textContent === '()'){
        const array = addBrackets(input.value,input)
        input.value = array[0]
        input.setSelectionRange(array[1],array[1])
        return null
    }
    if(button.textContent ==='+-'){
        if(input.value[input.value.length-1]==='-'){
            input.value = input.value.slice(0,input.value.length-1)
        }
        else{
            const array = addSymbol(input.value,'+',input)
            input.value = array[0]
            input.setSelectionRange(array[1],array[1])
        }
        return null
    }
    if(button.classList.contains('setAnswer')){
        let string =  hardMathOperation(input.value)
        if(string){
            input.value = string
        }
        else{
            let warningWindowTitle = document.querySelector('.warning-window__title')
            warningWindowTitle.textContent = 'Использован неверный формат'
            animationWindow(warningWindow,'animation-window',5000)
        }
        return null
    }
    const array = addSymbol(input.value,buttonText,input)
    input.value = array[0]
    input.setSelectionRange(array[1],array[1])
}
const addSymbol = (string,element,input)=>{
    input.focus()
    string = string.split('')
    let array = []
    let index = string.length+1
    if(input.selectionStart === string.length){
        string.push(element)
        string = string.join('')
        return [string,index+element.length+1]
    }
    for(let i = 0; i < string.length;i++){
        if(i === input.selectionStart){
            index = i
            array.push(element)
            array.push(string[i])
        }
        else{
            array.push(string[i])
        }
    }
    string = [...array].join('')
    return [string,index+element.length]
}
const addBrackets = (string,input)=>{
    let bool = true
    for(let i = string.length; i > -1;i--){
        if(string[i]==='('){
            bool = false
            string = addSymbol(string,')',input)
            return string
        }
        if(string[i]===')'){
            bool = false
            string = addSymbol(string,'(',input)
            return string
        }
    }
    if(bool){
        string = addSymbol(string,'(',input)
    }
    return string
}
export default addOnInput