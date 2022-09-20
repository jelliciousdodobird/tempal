import { css, Global, useTheme } from "@emotion/react";

export const GlobalStyles = () => {
  const theme = useTheme();

  // color: ${ theme.colors.onSurface.B00 };

  // background: ${ theme.colors.background.D20 };
  // color: ${ theme.colors.onBackground.B00 };

  // background - color: ${ theme.colors.background.B00 };

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: 0;
          outline: 0;

          font-family: ${theme.font.family};
          font-size: ${theme.font.size}px;
          font-weight: ${theme.font.weight};
          color: ${theme.colors.hypoface[10]};

          -webkit-tap-highlight-color: transparent;

          &::selection {
            background: ${theme.colors.focal[5]};
            color: #222;
          }
        }

        html {
          /* border: 2px dashed red; */

          background-color: ${theme.colors.surface[5]};

          overflow: hidden;
          scroll-behavior: smooth;
          overscroll-behavior-x: contain;

          min-height: 100%;
          height: 100%;

          display: flex;
          flex-direction: column;

          body {
            /* border: 2px dashed blue; */
            overflow-x: hidden;
            overflow-y: auto;

            /* overflow: hidden; */

            flex: 1;
            display: flex;
            flex-direction: column;

            #__next {
              /* border: 2px dashed yellowgreen; */
              /* overflow-x: hidden; */
              flex: 1;
              display: flex;
              flex-direction: column;
            }
          }
        }

        a,
        a:link,
        a:visited,
        a:hover,
        a:active {
          text-decoration: none;
        }

        ul,
        ol {
          list-style-type: none;
        }

        button {
          border: 0;
        }

        button:active,
        button:focus {
          outline: 0;
        }

        input {
          border: 0;
          outline: 0;
        }

        img {
          display: block;
        }
      `}
    />
  );
};
