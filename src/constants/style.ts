export const activeFilterButton = (isActive: boolean) => {
  if (!isActive) return {};

  return {
    style: {
      backgroundImage: `radial-gradient(
        60% 120% at 10% 80%,
        hsla(262.1, 83.3%, 57.8%, 0.55) 0%,
        hsla(262.1, 83.3%, 57.8%, 0) 100%
        )`,
    },
    className: 'border border-primary',
  };
};
