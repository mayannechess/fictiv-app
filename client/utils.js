
const fixLineBreaks = function(text) {
  return text.replace(/[^\s-][A-Z]/g, function(match) {
    return (match[0] + " / " + match[1]);
  });
};

const separateDashes = function(text) {
  return text.replace(/--/g, " -- ");
}


export { fixLineBreaks, separateDashes };