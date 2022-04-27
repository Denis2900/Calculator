import showOrClose from "./ShowOrCloseBlock"
const animationWindow = (window,className,time,command = 'show',cover=null)=>{
    if(window.classList.contains(className)){
        return null
    }
    window.classList.add(className)
    setTimeout(()=>{
        window.classList.remove(className)
        if(command==='close'){
            showOrClose(window,'block')
        }
        if(cover){
            showOrClose(cover,'block')
        }
    },time)
}
export default animationWindow