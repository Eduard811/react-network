import React from 'react'

export const Input = ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error
  const formControl = "form-control"

  return (
    <input
      {...input}
      {...props}
      className={formControl + " " + (hasError ? "is-invalid" : '')}
      tabIndex="0"
      data-toggle="tooltip"
      title={hasError ? meta.error : ''}
    />
  )
}