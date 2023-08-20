"use client"

interface CustomButtonProps {
    btnType?: "button" | "submit"
    containerStyles?: string
    textStyles?: string
    title: string
    handleClick?: () => void
}

const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles }: CustomButtonProps) => {
  return (
    <button
      type={btnType || "button"}
      className={`${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>
        {title}
      </span>
    </button>
  )
}

export default CustomButton

