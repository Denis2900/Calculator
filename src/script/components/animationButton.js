const animationButton = (button)=>{
    button.classList.add('animation-buttons')
    setTimeout(()=>{
        button.classList.remove('animation-buttons')
    },500)
}
export default animationButton