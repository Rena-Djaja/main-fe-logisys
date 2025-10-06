"use client"

import React, {FC} from 'react';
import {Input} from "@/components/shared/ui/input";
import {CustomInputProps} from "@/type/FormInputs";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/shared/ui/form";


const CustomInput: FC<CustomInputProps> = (props) => {
  const { label, placeholder, name, control, disabled, helperText } = props;

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            {!!label && <FormLabel>{ label }</FormLabel>}
            <FormControl>
              <Input placeholder={placeholder} {...field} disabled={disabled} />
            </FormControl>
            { helperText && (
              <FormDescription className='text-[0.8rem]'>
                { helperText }
              </FormDescription>
            ) }
            <FormMessage />
          </FormItem>
        )
      }}
    />
  );
};

export default CustomInput;