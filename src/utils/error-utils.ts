import {setErrorAC, SetErrorActionType, setRequestStatusAC, SetRequestStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

type ErrorType = {
   message: string
}



export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
   if (data.messages.length) {
      dispatch(setErrorAC(data.messages[0]))
   } else {
      const defaultError = 'Some error'
      dispatch(setErrorAC(defaultError))
   }
   dispatch(setRequestStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, e: ErrorType) => {
   dispatch(setRequestStatusAC('failed'))
   dispatch(setErrorAC(e.message))
}

type ErrorUtilsDispatchType = SetRequestStatusActionType | SetErrorActionType