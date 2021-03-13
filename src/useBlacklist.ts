const blacklist: Array<string> = [
  'aspectRatio',
  'elevation',
  'flex',
  'flexBasis',
  'flexGrow',
  'flexShrink',
  'maxLength',
  'opacity',
  'shadowOpacity',
  'zIndex',
];

export const useBlacklist = (key: string) => blacklist.some((value) => key === value);
