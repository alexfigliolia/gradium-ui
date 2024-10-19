export const forceAtIndex = <T>(
  array: (T | undefined)[],
  index: number,
  insertion: T | undefined,
) => {
  const copy = [...array];
  const N = copy.length - 1;
  if (index < N) {
    copy.splice(index, 1, insertion);
  } else {
    for (let i = N + 1; i <= index; i++) {
      copy.push(i === index ? insertion : undefined);
    }
  }
  return copy;
};
