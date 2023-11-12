import React from 'react'
import PropTypes from 'prop-types'
import UpAndDownIcon from '../../assets/up-down-arrow.svg'
import './styles.css'
import { fromAmount, toAmount, toToken, fromToken } from '../Exchange'

const SwapButton = () => {
  const handleClick = () => {
    const temp = fromToken.value
    fromToken.value = toToken.value
    toToken.value = temp
    fromAmount.value = toAmount.value
    toAmount.value = fromAmount.value * fromToken.value.price / toToken.value.price
  }
  return (
    <div className="swap-form__input__token__icon">
      <button className="swap-form__input__token__icon__button" type="button" onClick={handleClick}>
        <img src={UpAndDownIcon} alt="swap" width="20" height="20" />
      </button>
    </div>
  )
}

SwapButton.propTypes = {}

export default SwapButton