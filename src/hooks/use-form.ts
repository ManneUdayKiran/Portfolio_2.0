'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

interface UseFormOptions<T> {
  defaultValues?: Partial<T>
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

export function useForm<T extends Record<string, any>>(options: UseFormOptions<T> = {}) {
  const [values, setValues] = useState<T>(options.defaultValues as T || {} as T)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const register = (name: keyof T, rules?: { required?: string; pattern?: { value: RegExp; message: string } }) => ({
    name: name as string,
    value: values[name] || '',
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setValues(prev => ({ ...prev, [name]: value }))
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
    },
    onBlur: () => {
      setTouched(prev => ({ ...prev, [name]: true }))
      
      // Validate on blur
      if (rules) {
        let error = ''
        if (rules.required && !values[name]) {
          error = rules.required
        } else if (rules.pattern && values[name] && !rules.pattern.value.test(values[name])) {
          error = rules.pattern.message
        }
        
        if (error) {
          setErrors(prev => ({ ...prev, [name]: error }))
        }
      }
    }
  })

  const handleSubmit = (onSubmit: (values: T) => void | Promise<void>) => (e: FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    if (options.validate) {
      const validationErrors = options.validate(values)
      setErrors(validationErrors)
      
      if (Object.keys(validationErrors).length > 0) {
        return
      }
    }
    
    onSubmit(values)
  }

  const reset = () => {
    setValues(options.defaultValues as T || {} as T)
    setErrors({})
    setTouched({})
  }

  return {
    register,
    handleSubmit,
    formState: { errors, touched },
    reset,
    values,
  }
}