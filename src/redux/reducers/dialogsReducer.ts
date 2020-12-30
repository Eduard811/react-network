const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE'

type UsersType = {
  id: number,
  name: string
}

type MessagesType = {
  id: number,
  message: string,
  name: string
}

const initialState = {
  users: [
    {id: 1, name:'Sasha'},
  ] as Array<UsersType>,
  messages: [
    {id: 1, message: 'Hi, my name is Sasha', name: 'Sasha'},
    {id: 2, message: 'How are you?', name: 'Sasha'}
  ] as Array<MessagesType>
}

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type sendMessageActionType = {
  type: typeof SEND_NEW_MESSAGE,
  newMessageBody: string
}

export const sendMessageAC = (newMessageBody: string): sendMessageActionType => ({type: SEND_NEW_MESSAGE, newMessageBody})

export default dialogsReducer