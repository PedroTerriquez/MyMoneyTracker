export const Money = {
  currency_to_number(value) {
    return value.replace( /^\D+/g, '');
  }
}

