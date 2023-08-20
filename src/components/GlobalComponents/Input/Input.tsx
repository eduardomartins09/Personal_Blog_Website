'use client'

interface InputProps {
    type: any
    value?: any
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
    name: string
    id: string
    containerStyles?: string
    placeholder: string
}

const Input = ({ type, value, onChange, onKeyDown, name, id, placeholder, containerStyles }: InputProps) => {
  return (
    <input 
        type={type} 
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`w-full outline-none text-black ${containerStyles}`}
        required
    />
  )
}

export default Input