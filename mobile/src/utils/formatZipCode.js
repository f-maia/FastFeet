export default function (code) {
  const codeArray = code.split('');
  codeArray.splice(5, 0, '-');
  return codeArray.join('');
}
