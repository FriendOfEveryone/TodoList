import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
   callback: (newTitle: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo((props) => {
   console.log('AddItemForm')

   const [title, setTitle] = useState("")
   const [error, setError] = useState<string | null>(null)

   const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error) {
         setError(null);
      }
      if (e.charCode === 13) {
         addItem();
      }
   }

   const addItem = () => {
      const newTitle = title.trim();
      if (newTitle !== "") {
         props.callback(newTitle);
         setTitle("")
      } else {
         setError("Title is required");
      }
   }

   const styles = {
      maxWidth: '40px',
      maxHeight: '40px',
      minWidth: '40pxx',
      minHeight: '40px',
   }

   return (
      <div>
         <TextField id="outlined-basic"
                    label={error ? error : 'type smth...'}
                    variant="outlined"
                    size={'small'}
                    error={!!error}
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressHandler}
         />
         <Button variant={'contained'} onClick={addItem} size={'small'} style={styles}>+</Button>
      </div>
   );
})