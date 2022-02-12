// Establish DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')
let store = Redux.createStore(groceryReducer)

// establish the reducer. Takes initial state value and an action as arguments.
const groceryReducer = (state = initialState.groceries, action) => {
    switch (action.type) {
        case 'grocery/add':
            return [
                ...state,
                {
                    text: action.text
                }
            ]
        case 'grocery/clear':
            return []
        default:
            return state
    }
}

// Instantiate default state value:
const initialState = {
    groceries: []
}
const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type: 'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
}
grocerySubmit.addEventListener('submit', (e) => { newGrocery(e) })
clearBtn.addEventListener('click', clearList)

const clearList = () => {
    document.getElementById('newItem').value = ''
    store.dispatch({
        type: 'grocery/clear'
    })
}
const renderList = (state) => {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        let li = document.createElement('li')
        list.appendChild(li)
        li.textContent = grocery.text
    })
}
const render = () => {
    const state = store.getState()
    renderList(state)
}

store.subscribe(render)