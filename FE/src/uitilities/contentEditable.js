//onKeydown
export const saveContentAfterPressEnter = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
}

//Select all input value when click
export const selectAllInLineText = (e) => {
    e.target.focus()
    e.target.select() // or can use "document.execCommand('selectAll', false, null)"
}