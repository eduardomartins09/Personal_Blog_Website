'use client'

import { useRef } from "react"

const Form = ({ action, ...props }) => {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleAction(formData) {
    await action(formData)
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <form {...props} ref={formRef} action={handleAction} />
  )
}

export default Form