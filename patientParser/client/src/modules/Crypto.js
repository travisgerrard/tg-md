/*jshint esversion: 6 */

// Our decoder!

class Crypto {
  static decodeString(stringToDecode, secretCode) {
    // Next line in english
    // If stringToDecode is undefined return "" else decode the string. Return the result
    return (stringToDecode === undefined) ? "" : CryptoJS.AES.decrypt(stringToDecode, secretCode).toString(CryptoJS.enc.Utf8);
  }

  static encodeString(stringToEncode, secretCode) {
      return CryptoJS.AES.encrypt(stringToEncode, secretCode).toString();
    }
}

export default Crypto;
