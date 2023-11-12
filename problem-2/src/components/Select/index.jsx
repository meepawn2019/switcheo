import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect, { components } from 'react-select'
import './styles.css'
import { fromAmount, fromToken, toAmount, toToken } from '../Exchange'


const getIcon = (currency) => {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`
}

const Option = (props) => {
  return (
    <div className='dd-option-container'>
      <img src={getIcon(props.data.currency)} alt={props.data.currency} width="20" height="20" />
      <components.Option {...props} />
    </div>
  );
};

const Control = (props) => {
  return (
    <div>
      <components.Control {...props}>
        <img src={getIcon(props.selectProps.value.currency)} alt={props.selectProps.value.currency} width="20" height="20" />
        {props.children}
      </components.Control>
    </div>
  );
}

Option.propTypes = {
  data: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
}

Control.propTypes = {
  selectProps: PropTypes.shape({
    value: PropTypes.shape({
      currency: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
}

const CustomSelect = ({ tokens, type }) => {

  const handleChange = React.useCallback((option) => {
    if (type === 'from') {
      if (option.currency === toToken.value.currency) {
        toToken.value = fromToken.value
        const temp = fromAmount.value
        fromAmount.value = toAmount.value
        toAmount.value = temp
      } 
      fromToken.value = option
    } else if (type === 'to') {
      if (option.currency === fromToken.value.currency) {
        fromToken.value = toToken.value
        const temp = fromAmount.value
        fromAmount.value = toAmount.value
        toAmount.value = temp
      }
      toToken.value = option
    }
  }, [type])


  if (!tokens.length) {
    return null
  }
  return (
    <ReactSelect 
      options={tokens}
      defaultValue={type === 'from' ? fromToken.value : toToken.value}
      getOptionLabel={({ currency }) => currency}
      getOptionValue={({ currency }) => currency}
      formatOptionLabel={({ currency }) => (
        <div className='option-container'>
          <span className='option-container__currency'>{currency}</span>
        </div>
      )}
      styles={{
        option: (base) => ({
          ...base,
          maxHeight: 60,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:active': {
            backgroundColor: 'transparent',
          },
          '&:focus': {
            backgroundColor: 'transparent',
          },
        }),
        control: (base) => ({
          ...base,
          paddingTop: 4,
          paddingLeft: 8,
          paddingBottom: 4,
          border: '1px solid #E0E0E0',
          backgroundColor: '#27262c',
          color: '#fff',
        }),
        container: (base) => ({
          ...base,
          width: '100px',
        }),
        menu: (base) => ({
          ...base,
          width: '200px',
        }),
        menuList: (base) => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
        }),
      }}
      components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, Option, Control }}
      onChange={handleChange}
      value={type === 'from' ? fromToken.value : toToken.value}
    />
  )
}

CustomSelect.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  type: PropTypes.oneOf(['from', 'to']).isRequired,
}

export default CustomSelect