import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setErrorAC} from "../../app/app-reducer";

export const CustomizedSnackbars: FC = () => {

   const error = useAppSelector(state => state.app.error)
   const dispatch = useAppDispatch()

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }
      dispatch(setErrorAC(null))
   };

   return (
      <div>
         <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert
               onClose={handleClose}
               severity="error"
               variant="filled"
               sx={{ width: '100%' }}
            >
               {error}
            </Alert>
         </Snackbar>
      </div>
   );
}