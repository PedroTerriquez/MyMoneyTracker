export const Money = {
  currency_to_number(value) {
    if (value === '') { return 0 }
    return parseFloat(value.replace(/\$|,/g, ''))
  }
}

