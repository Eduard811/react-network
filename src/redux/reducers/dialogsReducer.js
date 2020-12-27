const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE'

const initialState = {
  users: [
    {id: 1, name:'Sasha'},
  ],
  messages: [
    {id: 1, message: 'Hi, my name is Sasha', name: 'Sasha'},
    {id: 2, message: 'How are you?', name: 'Sasha'}
  ]
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, {id: Math.random(), message: action.newMessageBody, name: 'You'}]
      }
    default:
      return state
  }
}

export const sendMessageAC = (newMessageBody) => ({type: SEND_NEW_MESSAGE, newMessageBody})

export default dialogsReducer