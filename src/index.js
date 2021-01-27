// Problem Statement

/*
  
  Have the function StingChallenge(str) read the str parameter being passed which will be a string of HTML DOM Elements
  and plain text. The elements will be used are b, i, em, div, p. For example, if str is "<div><b><p>Hello World</p></b></div>"
  then this string of DOM elements is nested correctly so your program should return the string true.

  If a string is not nested correctly, return the first element encountered where if changed into a different element,
  would result in a properly formatted string. If the string is not formatted properly, then it will only be one element
  that needs to be changed. For example, if str is "<div><i>Hello</i>World</b>" then your program should return the string
  div because if the first <div> element were changed into a <b>, the string would be properly formatted.

*/

function checkValidClosingElement(openingEle, closingEle) {
  return (
    (openingEle === "<b>" && closingEle === "</b>") ||
    (openingEle === "<i>" && closingEle === "</i>") ||
    (openingEle === "<div>" && closingEle === "</div>") ||
    (openingEle === "<p>" && closingEle === "</p>") ||
    (openingEle === "<em>" && closingEle === "</em>")
  );
}

function StringChallenge(str) {
  if (typeof str !== "string") {
    throw new Error(
      `StringChallenge expects its arguement to be of type string, received ${typeof str}`
    );
  }

  const incorrectNestedElementsArr = [];
  const openingElementsArr = ["<b>", "<i>", "<div>", "<p>", "<em>"];
  const closingElementsArr = ["</b>", "</i>", "</div>", "</p>", "</em>"];
  let regexp = /<(.*?)>/g;
  let matchAll = str.matchAll(regexp);

  for (const element of matchAll) {
    if (openingElementsArr.includes(element[0])) {
      incorrectNestedElementsArr.push(element[0]);
    }

    if (closingElementsArr.includes(element[0])) {
      const popEle = incorrectNestedElementsArr.pop();
      if (!checkValidClosingElement(popEle, element[0])) {
        return popEle;
      }
    }
  }

  if (incorrectNestedElementsArr.length === 1) {
    return incorrectNestedElementsArr[0];
  }

  return true;
}

console.log(StringChallenge("<p><p><em></em><p></p><i></p>"));
