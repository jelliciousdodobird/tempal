import type { NextPage } from "next";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch.component";
import { pageLayout, placeMid } from "../../styles/utility-styles.css";
import { ColorShade } from "../../styles/theme.type";

import { coloredSquares, colorKey, colorRow } from "./theme-colors.css";

const ThemePage: NextPage = () => {
  return (
    <div className={pageLayout}>
      <div className={placeMid}>
        <ThemeSwitch />
        {coloredSquares.map(({ key, colors }, i) => (
          <div className={colorRow} key={key + i}>
            <span className={colorKey}>{key}</span>
            {Object.values(colors).map((color, j) => (
              <div key={key + j} className={color}>
                {j}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemePage;
