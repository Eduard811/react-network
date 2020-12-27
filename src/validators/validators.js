export const requiredField = (value) => value ? null : 'Field is required'

export const emailValidator = value => /.+@.+\.[A-Za-z]+$/.test(value) ? null : 'Enter the correct Email Address'

export const maxLengthCreator = maxLength => value => {
  if (value && value.length > maxLength) return "The maximum permissible value has been exceeded"

  return null
}
