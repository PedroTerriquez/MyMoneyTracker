export const Money = {
  currency_to_number(value) {
    return parseFloat(value.substring(1));
  }
}

