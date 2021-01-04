import {InferActionTypes} from "../store";

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
type ActionsType = InferActionTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType)
    : InitialStateType => {
  switch (action.type) {
    case 'SEND_NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, {id: Math.random(), message: action.newMessageBody, name: 'You'}]
      }
    default:
      return state
  }
}

export const actions = {
  sendMessageAC: (newMessageBody: string) => ({type: 'SEND_NEW_MESSAGE', newMessageBody} as const)
}


export default dialogsReducer