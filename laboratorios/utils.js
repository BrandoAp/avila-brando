const Utils = (()=>{
    const reverseString = c => String (c).split('').reverse().join('');
    const isPalindrome = c => String(c) === String (reverseString(c))
    const isDoubleBasePalindrome = (c) => {
        const n1 = Number(c).toString(2);
        const n2 = Number(c).toString(10);
        return isPalindrome(n1) && isPalindrome(n2);
      }
    const generatedRandomNumber = () => {
      let randomNumber = Math.floor(Math.random() * 99) + 1;
    }  
      return {
        reverseString,
        isPalindrome,
        isDoubleBasePalindrome,
        generatedRandomNumber,
      }

})();

window.Utils = Utils;