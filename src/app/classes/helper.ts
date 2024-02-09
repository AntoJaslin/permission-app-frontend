import { FormControl } from "@angular/forms";

export class Helper{



    /**
     * @description
     *   To remove duplicates in array of primitives  and array of objects
     *
     * @example
     *   Helper.removeDuplicate([{id: 1}, {id: 1}, {id: 2}], 'id');
     *   [ { id: 1 }, { id: 2 } ]
     *
     * @param array - array of data
     * @param id - for array of objects
   */
    static removeDuplicate<T>(array: Array<T>, id = ''): Array<T> {
        // guard
        if (!array) {
          return array;
        }
    
        if (!id) {
          return array.filter((val, idx) => array.indexOf(val) === idx);
        }
        return array.filter((oVal, idx) => {
          return array.findIndex((iVal) => iVal[id] == oVal[id]) === idx;
        });
    };

     /* @param data */
    static shallowClone(data){
        if(data){
            return Array.isArray(data) ? [...data] : {...data};
        }
    };

     /* Cloning deeply */
    static deepClone(data){
        if(data){
            return JSON.parse(JSON.stringify(data));
        }
    };

    /* remove empty object key */

    static removeEmptyObjectValues(obj) {
      return Object.keys(obj)
        .filter((key) =>  {
          if(Array.isArray(obj[key])){
            return obj[key].length > 0 && obj[key] !== null && obj[key] !== '' && obj[key] !== undefined;
          }else {
            return obj[key] !== null && obj[key] !== '' && obj[key] !== undefined;
          }
        })
        .reduce((newObj, key) => {
          newObj[key] = obj[key];
          return newObj;
        }, {});
    };

      /* remove empty object key and remove inside empty object keys also*/
    static removeEmptyObjectValues2(obj) {
      return Object.keys(obj).reduce((newObj, key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          const nestedObj = this.removeEmptyObjectValues(obj[key]);
          if (Object.keys(nestedObj).length !== 0) {
            newObj[key] = nestedObj;
          }
        } else if (Array.isArray(obj[key])) {
          const filteredArray = obj[key].filter(item => (
            typeof item === 'object' && item !== null && Object.keys(item).length !== 0
          ));
          if (filteredArray.length !== 0) {
            newObj[key] = filteredArray;
          }
        } else if (obj[key] !== null && obj[key] !== '') {
          newObj[key] = obj[key];
        }
        return newObj;
      }, {});
    };

    /* remove form input empty speace */
    static noLeadingWhitespaceValidator(control: FormControl): { [key: string]: boolean } | null {
      const value = control.value;
      if (typeof value === 'string' && value.trimLeft() !== value) {
        return { noLeadingWhitespace: true };
      }
      return null;
    };

    /* only allowed middle,right space, dot and alpabatic character only */
    static validateTheInput(control: FormControl): { [key: string]: boolean } | null {
      const value = control.value;
  
      // Check if the value contains non-alphabetic characters, space, or dot
      const nonAlphabeticCharacters = /[^a-zA-Z\s.]/.test(value);
    
      if (nonAlphabeticCharacters) { return { invalidCharacters: true } };
    
      // Check for leading whitespace
      if (typeof value === 'string' && value.trimLeft() !== value) {  return { noLeadingWhitespace: true } };
      
      return null;
    };
}