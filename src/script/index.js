import addOnInput from "./components/addInInput";
import animationButton from "./components/animationButton";
import showOrClose from "./components/ShowOrCloseBlock"
import saveNumberInMenory from "./components/saveNumberInMemory"
import animationWindow from "./components/animationWindow";
let allBtn = document.querySelectorAll('.buttons-block__button')
let mainInput = document.querySelector('.mainInput')
let warningWindow = document.querySelector('.warning-window')
let saveModalWindow = document.querySelector('.save-modal-window')
let btnListStoredVariables = document.querySelector('.header__list')
let btnListHistory = document.querySelector('.header__history')
let btnDeleteHistory = document.querySelector('.delete-history')
let btnDeleteNumber = document.querySelector('.delete-number')
let cover = document.querySelector('.cover')
let deleteBtn = document.querySelector('.header__delete-symbol button')
let mathLibraryButton = document.querySelector('.header__math-library button')
let mathLibrary = document.querySelector('.math-library')
allBtn.forEach((buttonBlock)=>{
    let button = buttonBlock.childNodes[0]
    button.addEventListener('click',()=>{
        animationButton(button)
        if(button.parentElement.classList.contains('show-modal-window')){
           showWindowSave()
           return null
        }
        if(!button.parentElement.classList.contains('delete-history') && !button.parentElement.classList.contains('delete-number')){
            addOnInput(mainInput,button,warningWindow,button.textContent)
        }
        
    })
})
deleteBtn.addEventListener('click',()=>{
    let array = mainInput.value.split('')
    let number = 0
    mainInput.focus()
    array = array.filter((element,index)=>{
        if(index!==mainInput.selectionStart-1){
            return element
        }
        else{
            number = index
        }
    })
    mainInput.value = array.join('')
    mainInput.setSelectionRange(number,number)
})
mathLibraryButton.addEventListener('click',()=>{
   mathLibrary.classList.add('animation-math-library__show')
   showOrClose(mathLibrary,'grid')
   mathLibrary.childNodes.forEach((element)=>{
       element.addEventListener('click',sendingMathButton)
   })
})
const sendingMathButton = (event)=>{
    let element = event.currentTarget
    animationButton(element)
    if(element.getAttribute('name')==='const'){
        const object = {
            'pi':Math.PI+'',
            'e':Math.E+''
        }
        addOnInput(mainInput,element,warningWindow,object[element.textContent])
    }
    else if(element.getAttribute('name')){
        const attribute = element.getAttribute('name')
        addOnInput(mainInput,element,warningWindow,attribute)
    }
    else{
        if(!warningWindow.classList.contains('animation-window')){
            const warningWindowTitle = document.querySelector('.warning-window__title')
            if(event.target.textContent ==='Rad'){
                warningWindowTitle.textContent = 'Для расчетов используются радианы'
                event.target.textContent ='Deg'
            }
            else{
                warningWindowTitle.textContent = 'Для расчетов используются градусы'
                event.target.textContent ='Rad'
            }
            warningWindow.classList.add('animation-window')
            setTimeout(()=>{
                warningWindow.classList.remove('animation-window')
            },5000)
        }
    }
}
const showWindowSave = ()=>{
    showOrClose(saveModalWindow,'block')
    showOrClose(cover,'block')
    animationWindow(saveModalWindow,'animation-show-modal-window',1000)
    let closeBtn = saveModalWindow.querySelector('.standart-button__close')
    let saveBtn = saveModalWindow.querySelector('.standart-button__save')
    let linkInSymbolLibrary = saveModalWindow.querySelector('.save-modal-window__symbol-library a')
    linkInSymbolLibrary.addEventListener('click',showSymbolLibrary)
    const closeModalWindow = (event)=>{
        animationWindow(saveModalWindow,'animation-close-modal-window',1000,'close',cover)
        event.target.removeEventListener('click',closeModalWindow)
        saveBtn.removeEventListener('click',saveCurrent)
    }
    closeBtn.addEventListener('click',closeModalWindow)
    const saveCurrent = ()=>{
        let localInput = saveModalWindow.querySelector('.save-modal-window__input input')
        let localInputValue = localInput.value
        const mainValue = mainInput.value
        const warningWindowTitle = document.querySelector('.warning-window__title')
        if(mainValue&&!isNaN(mainValue)&&localInputValue){
            const responseFunction = saveNumberInMenory('saveNumber',[{text:localInputValue,sup:'',sub:''},mainValue])
            if(!responseFunction){
                const warningWindow = document.querySelector('.window')
                const localCover = document.querySelector('.local-cover')
                showOrClose(localCover,'block')
                showOrClose(warningWindow,'block')
                changeValueOfVariable(warningWindow,localCover,[localInputValue,mainValue])
                localInput.value = ''
                return null
            }
            warningWindowTitle.textContent = 'Переменная сохранена'
            localInput.value = ''
        }
        else{
            warningWindowTitle.textContent = 'Использован неверный формат'
        }
        animationWindow(warningWindow,'animation-window',5000)
    }
    saveBtn.addEventListener('click',saveCurrent)
    return null
}
const showSymbolLibrary = ()=>{
    const symbolsLibrary = document.querySelector('.symbols-library')
    const symbolsLibraryBlock = symbolsLibrary.querySelector('.symbols-library__block')
    const inputs = symbolsLibrary.querySelectorAll('.symbols-library__input input')
    animationWindow(symbolsLibrary,'animation-show-symbols-library',1000)
    showOrClose(symbolsLibrary,'block')
    let activeInput = null
    const answer = symbolsLibrary.querySelector('.answer__block')
    const inputMainText = symbolsLibrary.querySelector(".input-main-text")
    const inputIndexText = symbolsLibrary.querySelector(".input-index-text")
    const inputDegreeText = symbolsLibrary.querySelector(".input-degree-text")
    const btnSave = symbolsLibrary.querySelector('.standart-button__save')
    const btnClose = symbolsLibrary.querySelector('.standart-button__close')
    answer.innerHTML = `${inputMainText.value}<sub>${inputIndexText.value}</sub><sup>${inputDegreeText.value}</sup>`
    const addListenerInSymbol = (event)=>{
        if(activeInput){
            activeInput.value +=event.target.textContent
            answer.innerHTML = `<span>${inputMainText.value}</span><sub>${inputIndexText.value}</sub><sup>${inputDegreeText.value}</sup>`
        }
    }   
    symbolsLibraryBlock.childNodes.forEach((symbol)=>{
        symbol.addEventListener('click',addListenerInSymbol)
    })
    inputs.forEach((input)=>{
        input.addEventListener('click',()=>{
            activeInput = input
        })
        input.addEventListener('change',()=>{
            answer.innerHTML = `${inputMainText.value}<sub>${inputIndexText.value}</sub><sup>${inputDegreeText.value}</sup>`
        })
    })
    const saveName = ()=>{
        const warningWindowTitle = document.querySelector('.warning-window__title')
        if(answer.textContent!=='' && mainInput.value && !isNaN(mainInput.value)){
            const nameOfVariable = {text:answer.childNodes[0].textContent,sub:answer.childNodes[1].textContent,sup:answer.childNodes[2].textContent}
            const responseFunction = saveNumberInMenory('saveNumber',[nameOfVariable,mainInput.value])
            if(!responseFunction){
                const warningWindow = document.querySelector('.window')
                const localCover = document.querySelector('.local-cover')
                showOrClose(localCover,'block')
                showOrClose(warningWindow,'block')
                changeValueOfVariable(warningWindow,localCover,[nameOfVariable,mainInput.value])
                return null
            }
            else{
                warningWindowTitle.textContent = 'Переменная сохранена'
            }  
        }
        else{
            warningWindowTitle.textContent = 'Использован неверный формат' 
        }
        animationWindow(warningWindow,'animation-window',5000)
       
    }  
    btnSave.addEventListener('click',saveName)
    const closeLibrary = (event)=>{
        inputMainText.value = ''
        inputDegreeText.value = ''
        inputIndexText.value = ''
        symbolsLibraryBlock.childNodes.forEach((symbol)=>{
            symbol.removeEventListener('click',addListenerInSymbol)
        })
        animationWindow(symbolsLibrary,'animation-close-symbols-library',1000,'close')
        event.target.removeEventListener('click',closeLibrary)
        btnSave.removeEventListener('click',saveName)
    }
    btnClose.addEventListener('click',closeLibrary)
}
const changeValueOfVariable = (titleWindow,localCover,currentVariable)=>{
    const cancel = (event)=>{
        showOrClose(titleWindow,'block')
        showOrClose(localCover,'block')
        event.target.removeEventListener('click',cancel)
        btnChange.removeEventListener('click',changeValue)
    }
    const changeValue = (event)=>{
        saveNumberInMenory('saveNumber',currentVariable,true)
        const warningWindowTitle = document.querySelector('.warning-window__title')
        warningWindowTitle.textContent = 'Значение переменной было изменено' 
        animationWindow(warningWindow,'animation-window',5000)
        showOrClose(titleWindow,'block')
        showOrClose(localCover,'block')
        event.target.removeEventListener('click',changeValue)
        btnCancel.removeEventListener('click',cancel)
    }
    const btnChange = titleWindow.querySelector('.standart-button__change')
    const btnCancel = titleWindow.querySelector('.standart-button__cancel')
    btnChange.addEventListener('click',changeValue)
    btnCancel.addEventListener('click',cancel)
}
const showList = (event)=>{
    if(event.currentTarget.getAttribute('disabled')){
        return null
    }
    event.currentTarget.setAttribute('disabled',true)
    const button = event.currentTarget
    setTimeout(()=>{
        button.removeAttribute('disabled')
    },1000)
    let buttonBlockGrid = document.querySelector('.button-block__grid')
    let buttonBlockWindow = document.querySelector('.buttons-block__window')
    let array
    if(buttonBlockGrid.classList.contains('small-buttons')){
        buttonBlockGrid.classList.remove('small-buttons')
        animationWindow(buttonBlockWindow,'animation-close-list',1000,'close')
        animationWindow(buttonBlockGrid,'animation-moving-block-right',1000)
        while(buttonBlockWindow.childNodes){
            let children = buttonBlockWindow.childNodes[0]
            buttonBlockWindow.removeChild(children) 
        }
    }
    else{
        if(event.currentTarget.classList.contains('header__list')){
            array = JSON.parse(localStorage.getItem('saveNumber'))
            if(!array || array.length===0){
                return null
            }
            buttonBlockGrid.classList.add('small-buttons')
            showOrClose(buttonBlockWindow,'block')
            animationWindow(buttonBlockWindow,'animation-show-list',1000)
            animationWindow(buttonBlockGrid,'animation-moving-block-left',1000)
            const addText = function(){
                const elem = this.parentElement.previousElementSibling
                addOnInput(mainInput,elem,warningWindow,elem.textContent)
            }
            const deleteInMemory = function(){
                const key = this.parentElement.previousElementSibling.previousElementSibling.textContent
                const number = +this.parentElement.previousElementSibling.textContent
                const array = [key,number]
                saveNumberInMenory('saveNumber',array,'delete')
                buttonBlockWindow.removeChild(this.parentElement.parentElement)
            }
            array.forEach((item)=>{
                let div = document.createElement('div')
                div.innerHTML = `<div><span>${item[0].text}</span><sub>${item[0].sub}</sub><sup>${item[0].sup}</sub></div><div>${item[1]}</div><div class="buttons"><button class="items__button add">добавить</button>
                <button class="items__button delete">удалить</button></div>`
                div.classList.add('buttons-block__item')
                buttonBlockWindow.appendChild(div)
                div.querySelector('.add').addEventListener('click',addText)
                div.querySelector('.delete').addEventListener('click',deleteInMemory)
            })

        }
        else{
            array = JSON.parse(localStorage.getItem('history'))
            if(!array || array.length===0){
                return null
            }
            buttonBlockGrid.classList.add('small-buttons')
            showOrClose(buttonBlockWindow,'block')
            animationWindow(buttonBlockWindow,'animation-show-list',1000)
            animationWindow(buttonBlockGrid,'animation-moving-block-left',1000)
            
            array.forEach((element)=>{
                let div = document.createElement('div')
                div.textContent = element[0]
                div.classList.add('window-block__text')
                buttonBlockWindow.appendChild(div)
            })
        }
    }
}
btnListStoredVariables.addEventListener('click',showList);
btnListHistory.addEventListener('click',showList)
btnDeleteHistory.addEventListener('click',()=>{saveNumberInMenory('history',[],'deleteAll')})
btnDeleteNumber.addEventListener('click',()=>{saveNumberInMenory('saveNumber',[],'deleteAll')})
