const showOrClose = (block,displayStyle)=>{
    if(block.style.display && block.style.display!=='none'){
        block.style.display = 'none'
    }
    else{
        block.style.display = displayStyle
    }
}
export default showOrClose