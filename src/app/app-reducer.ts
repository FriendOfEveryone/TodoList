export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
   status: 'loading' as RequestStatusType,
   error: null
}

type InitialStateType = {
   status: RequestStatusType
   error: null | string
}

export type SetRequestStatusActionType = {
   type: 'APP/SET-STATUS'
   status: RequestStatusType
}

export type SetErrorActionType = {
   type: 'APP/SET-ERROR'
   error: null | string
}


export type ActionsAppType = SetRequestStatusActionType | SetErrorActionType

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
   switch (action.type) {
      case 'APP/SET-STATUS':
         return {...state, status: action.status}
      case 'APP/SET-ERROR': {
         return {...state, error: action.error}
      }
      default:
         return state
   }
}

export const setRequestStatusAC = (status: RequestStatusType): SetRequestStatusActionType => {
   return {type: 'APP/SET-STATUS', status}
}

export const setErrorAC = (error: null | string): SetErrorActionType => {
   return {type: 'APP/SET-ERROR', error}
}
