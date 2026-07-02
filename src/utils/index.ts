
export const txtSlicer = (text: string, max: number) => {
  if (text.length < max) return text;
  else return `${text.slice(0, max)}...`;
};





