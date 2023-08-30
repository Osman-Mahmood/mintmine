export function customFormat(num) {
  // Convert the number to a string
  let numStr = num.toString();

  // Find the first non-zero digit after the decimal point
  let decimalIndex = numStr.indexOf('.');
  if (decimalIndex === -1) {
    // No decimal point, return the original number
    return numStr;
  }

  // Extract the portion after the decimal point
  let decimalPart = numStr.substring(decimalIndex + 1);

  // Find the index of the first non-zero digit in the decimal part
  let firstNonZeroIndex = -1;
  for (let i = 0; i < decimalPart.length; i++) {
    if (decimalPart[i] !== '0') {
      firstNonZeroIndex = i;
      break;
    }
  }

  if (firstNonZeroIndex === -1) {
    // All digits after the decimal are zero, return the integer part
    return numStr.substring(0, decimalIndex);
  }

  // Keep only 2 digits after the first non-zero digit
  let customDecimalPart = decimalPart.substring(firstNonZeroIndex, firstNonZeroIndex + 2);
  return `${numStr.substring(0, decimalIndex + firstNonZeroIndex + 1)}${customDecimalPart}`;
}



  
  