import React, {FC, memo} from 'react';
import Button from "@mui/material/Button";

type MyButtonPropsType = {
   variant: 'outlined' | 'contained'
   color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
   title: string
   callback: ()=>void
}

export const MyButton: FC<MyButtonPropsType> = memo(({variant, color, title, callback}) => {
   console.log('MyButton');
   return (
      <Button variant={variant} color={color} onClick={callback}>
         {title}
      </Button>
   )
})