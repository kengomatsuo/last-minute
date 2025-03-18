import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CustomButton from './CustomButton'
import CustomInteractive from './CustomInteractive'
import { set } from 'lodash'

/**
 * CustomCard component
 *
 * This component renders a card with a white background, shadow, and rounded corners.
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Custom class name for additional styling
 * @param {string} props.header - Header content of the card
 * @param {Function} props.onClick - Function to run when the card is clicked
 * @param {boolean} props.interactive - Whether the card is interactive (clickable). If `onClick` has a value, `interactive` will be `true` unless specified otherwise.
 * @param {React.ReactNode} props.children - Content of the card, typically text or other elements. Must be a <div> element.
 */
const CustomCard = ({
  className,
  header,
  onClick,
  interactive = !!onClick,
  children,
}) => {
  const [isPressed, setIsPressed] = useState(false)

  React.useEffect(() => {
    console.log(isPressed)
  }, [isPressed])

  return (
    <div
      className={`${className} ${
        interactive && !isPressed
          ? 'transition-all hover:ring hover:ring-primary cursor-pointer hover:scale-101 active:ring active:ring-primary active:scale-101'
          : ''
      } bg-card-background box-border border-card-outline border-2 backdrop-blur-sm flex p-4 flex-col rounded-xl`}
      onClick={onClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
    >
      <div className='text-lg font-semibold pb-2'>{header}</div>
      <div
        onPointerDown={e => {
          e.stopPropagation()
          e.preventDefault()
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

CustomCard.propTypes = {
  /**
   * Custom class name for additional styling.
   * This allows for custom styles to be applied to the card.
   * @type {string}
   */
  className: PropTypes.string,
  /**
   * The header of the card.
   * This can be text, an icon, or any other React node.
   * @type {string}
   */
  header: PropTypes.string,
  /**
   * Function to run when the card is clicked.
   * @type {Function}
   */
  onClick: PropTypes.func,
  /**
   * Whether the card is interactive (clickable).
   * If true, the card will have a pointer cursor.
   * If `onClick` has a value, `interactive` will be `true` unless specified otherwise.
   * @type {boolean}
   */
  interactive: PropTypes.bool,
  /**
   * The content of the card.
   * This can be text, an icon, or any other React node.
   * Must be a <div> element.
   * This prop is required.
   * @type {React.ReactNode}
   */
  children: PropTypes.node.isRequired,
}

export default CustomCard
