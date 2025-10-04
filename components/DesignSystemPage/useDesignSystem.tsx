"use client"

import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {OptionType} from "@/type/FormInputs";

const useDesignSystem = () => {
  const form = useForm()

  const [isLoading, setIsLoading] = useState(false)

  const genders = [
    {
      label: "Female",
      value: 1,
    },
    {
      label: "Male",
      value: 2,
    },
  ]

  const statuses: OptionType[] = [
    {
      value: "backlog",
      label: "Backlog",
    },
    {
      value: "todo",
      label: "Todo",
    },
    {
      value: "in progress",
      label: "In Progress",
    },
    {
      value: "done",
      label: "Done",
    },
    {
      value: "canceled",
      label: "Canceled",
    },
    {
      value: "backlog2",
      label: "Backlog2",
    },
    {
      value: "todo2",
      label: "Todo2",
    },
    {
      value: "in progress2",
      label: "In Progress2",
    },
    {
      value: "done2",
      label: "Done2",
    },
    {
      value: "canceled2",
      label: "Canceled2",
    },
  ]

  return {
    form,
    genders,
    statuses,
    isLoading,
  }
};

export default useDesignSystem;