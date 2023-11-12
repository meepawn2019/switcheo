import React, { useCallback } from 'react'
import './styles.css'
import SwapButton from '../SwapButton'
import CustomSelect from '../Select'
import api from '../../api/tokens';
import { signal } from "@preact/signals-react";

export const fromToken = signal(null)
export const toToken = signal(null)
export const fromAmount = signal(0)
export const toAmount = signal(0)

const Exchange = () => {

  const [tokens, setTokens] = React.useState([])
  const inputTokenRef = React.useRef(null)
  const outputTokenRef = React.useRef(null)

  React.useEffect(() => {
    const fetchTokens = async () => {
      const { data: tokensData } = await api.getTokens()
      // remove duplicates
      const uniqueTokens = [...new Set(tokensData.map(({ currency }) => currency))]
        .map(currency => tokensData.find(token => token.currency === currency))
      setTokens(uniqueTokens)
      fromToken.value = uniqueTokens[0]
      toToken.value = uniqueTokens[1]
    }

    fetchTokens()
  }, [])
  const handleInputTokenChange = React.useCallback((e) => {
    if (e.target.value < 0 || !e.target.value) {
      return
    }
    fromAmount.value = e.target.value
    toAmount.value = fromAmount.value * fromToken.value.price / toToken.value.price
  }, [])

  const handleOutputTokenChange = useCallback((e) => {
    if (e.target.value < 0 || !e.target.value) {
      return
    }
    toAmount.value = e.target.value
    fromAmount.value = toAmount.value * toToken.value.price / fromToken.value.price
  }, [])


  if (!tokens.length) {
    return null
  }



  return (
    <div className='exchange-container'>
      <h4>Swap</h4>
      <div className='exchange-container__token-input'>
        <CustomSelect tokens={tokens} type='from' />
        <div className='token-input-container' onClick={() => inputTokenRef.current.focus()}>
          <label>You Pay</label>
          <input type='number' className='token-input' ref={inputTokenRef} aria-label='token-input' placeholder={null} value={parseFloat(parseFloat(fromAmount.value).toFixed(5))} onChange={handleInputTokenChange} />
          <span className='token-input-currency'>
            {`~$${parseFloat((fromAmount.value * fromToken.value.price).toFixed(5))}`}
          </span>
        </div>
      </div>
      <SwapButton />
      <div className='exchange-container__token-input'>
        <CustomSelect tokens={tokens} type='to' />
        <div className='token-input-container' onClick={() => outputTokenRef.current.focus()}>
          <label>You Get</label>
          <input type='number' className='token-input' ref={outputTokenRef} aria-label='token-input' placeholder={null} value={parseFloat(parseFloat(toAmount.value).toFixed(5))} onChange={handleOutputTokenChange} />
          <span className='token-input-currency'>
            {`~$${parseFloat((toAmount.value * toToken.value.price).toFixed(5))}`}
          </span>
        </div>
      </div>
      {fromAmount.value >= 0 && (
        <div>
          <span>{`${parseFloat(parseFloat(fromAmount.value).toFixed(5))} ${fromToken.value.currency} = `}</span>
          <span>{`${parseFloat(parseFloat(toAmount.value).toFixed(5))} ${toToken.value.currency}`}</span>
        </div>
      )}
      <button className='exchange-container__button' type='button'>Swap</button>
    </div>
  )
}

export default Exchange