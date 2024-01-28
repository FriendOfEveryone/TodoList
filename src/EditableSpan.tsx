import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType = {
   oldTitle: string
   callback: (newTitle: string) => void
}
export const EditableSpan: FC<EditableSpanType> = React.memo(({oldTitle, callback}) => {

   const [edit, setEdit] = useState(false)
   const [newTitle, setNewTitle] = useState(oldTitle)

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value)
   }
   const activeEditHandler = () => {
      setEdit(!edit);
      callback(newTitle);
   }



   return (
            edit ?
               <input value={newTitle} onChange={onChangeHandler} onBlur={activeEditHandler} autoFocus/> :
               <span onDoubleClick={activeEditHandler}>{newTitle}</span>
   );
})