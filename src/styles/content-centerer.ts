import { css, Theme } from "@emotion/react";

const contentCenter = (theme: Theme) => css`
  width: clamp(300px, calc(50% + 100px), 1024px);
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.xs}px) {
    width: calc(100% - 2rem);
    margin: 0 auto;
  }
`;

export { contentCenter };
