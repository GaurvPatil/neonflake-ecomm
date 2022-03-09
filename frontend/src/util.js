export default function formatCurrency(num){
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}

// The Number() function converts the object argument to a number that represents the object's value.
// If the value cannot be converted to a legal number, NaN is returned.



// let numObj = 12345.6789
// numObj.toFixed()       // Returns '12346': note rounding, no fractional part
// numObj.toFixed(1)      // Returns '12345.7': note rounding
// numObj.toFixed(6)      // Returns '12345.678900': note added zeros


// The toFixed() method converts a number into a string, rounding to a specified number of decimals.

// Note: if the desired number of decimals are higher than the actual number, zeros are added to create the desired decimal length