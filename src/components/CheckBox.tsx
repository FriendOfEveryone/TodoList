import React, {ChangeEvent, FC} from 'react';
import Checkbox from "@mui/material/Checkbox";

type CheckBoxPropsType = {
   callback: (checked: boolean) => void
   checked: boolean
}

export const CheckBox: FC<CheckBoxPropsType> = ({callback, checked}) => {

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      callback(e.currentTarget.checked);
   }

   return (
      <Checkbox onChange={onChangeHandler}
                checked={checked}
      />
   );
};
