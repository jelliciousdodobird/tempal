// import {
//   statsContainer,
//   statLineContainer,
//   maxStatLine,
//   statLabel,
//   statValue,
//   statLine,
//   tvList,
//   tvContainer,
//   tvHeader,
//   tvValue,
//   tvLabel,
//   tvItem,
//   statsViewContainer,
// } from "./StatsView.css";
// import { assignInlineVars } from "@vanilla-extract/dynamic";
import { TemCardProps } from "../TemCard/TemCard.component";

interface StatsViewProps {
  stats: TemCardProps["stats"];
  tvYields: TemCardProps["tvYields"];
  maxStat?: number;
}

export const StatsView = ({
  stats,
  tvYields,
  maxStat = 125,
}: StatsViewProps) => {
  return (
    <div className={`statsViewContainer`}>
      <div className={`statsContainer`}>
        {Object.entries(stats).map(([stat, value]) => (
          <div className={`statLineContainer`} key={stat}>
            <span className={`statLabel`}>{stat}</span>
            <span className={`statValue`}>{value}</span>
            <div className={`maxStatLine`}>
              {stat !== "total" && (
                <span
                  className={`statLine`}
                  // style={assignInlineVars({
                  //   width: `${Math.min(100, (value / maxStat) * 100)}%`,
                  // })}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={`tvContainer`}>
        <span className={`tvHeader`}>TV Yield</span>
        <ul className={`tvList`}>
          {Object.entries(tvYields)
            .filter((item) => item[1] > 0)
            .map(([stat, tv]) => (
              <li key={stat} className={`tvItem`}>
                <span className={`tvLabel`}>{stat}</span>
                <span className={`tvValue`}>{tv}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
