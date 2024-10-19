export const forceAtIndex = <T>(
  array: (T | undefined)[],
  index: number,
  insertion: T | undefined,
) => {
  const copy = [...array];
  const N = copy.length;
  if (index < N) {
    copy.splice(index, 1, insertion);
  } else {
    for (let i = N; i <= index; i++) {
      copy.push(i === index ? insertion : undefined);
    }
  }
  return copy;
};
