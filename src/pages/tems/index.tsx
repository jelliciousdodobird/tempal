import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { TemCard } from "../../components/TemCard/TemCard.component";
import { TemType } from "../../data/temtems";
import { contentCenter } from "../../styles/content-centerer";
import { useThemeController } from "../../styles/theme/Theme.context";
import { createColorSpread } from "../../styles/theme/Theme.utils";

const Container = styled.div`
  ${({ theme }) => contentCenter(theme)};
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const List = styled.div`
  /* border: 1px dashed red; */

  width: 100%;

  display: grid;
  gap: 1.5rem;

  grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(224px, 260px));
  }
`;

const Header = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  width: 100%;

  /* background: gold; */

  /* border-radius: 20px; */

  span {
    color: black;
  }

  /* display: flex; */
  /* flex-direction: column; */
`;

export interface Stats {
  atk: number;
  def: number;
  hp: number;
  spatk: number;
  spd: number;
  spdef: number;
  sta: number;
}

export interface StatsWithTotal extends Stats {
  total: number;
}

type API_TemData = {
  name: string;
  number: number;
  types: [TemType, TemType | null];
  traits: [string, string];
  stats: StatsWithTotal;
  tvYields: Stats;

  wikiRenderStaticUrl: string;
  wikiRenderAnimatedUrl: string;
  wikiRenderStaticLumaUrl: string;
  wikiRenderAnimatedLumaUrl: string;
};

type TemProps = {
  tems: API_TemData[];
};

export const getStaticProps: GetStaticProps<TemProps> = async () => {
  const res = await axios.get("https://temtem-api.mael.tech/api/temtems", {
    params: {
      fields:
        "name,number,types,traits,stats,tvYields,wikiRenderStaticUrl,wikiRenderAnimatedUrl,wikiRenderStaticLumaUrl,wikiRenderAnimatedLumaUrl",
      weaknesses: true,
    },
  });
  const data = await res.data;
  return {
    props: { tems: data }, // will be passed to the page component as props
  };
};

const Palette = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ColorGroup = styled.div`
  border: 1px solid #222;

  mix-blend-mode: difference;
  background-blend-mode: saturation;

  /* filter: invert(1); */
  position: relative;
  display: column;
`;

const ColorRow = styled.div`
  position: relative;

  display: flex;
`;

const Square = styled.div<{ bgColor: string; fontColor?: string }>`
  /* padding: 5px; */

  width: 50px;
  height: 50px;

  background: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor ?? "white"};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpreadTitle = styled.span`
  padding-right: 1rem;

  background-color: #ddd;
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */

  /* filter: invert(1); */
  mix-blend-mode: difference;

  width: 8rem;
  color: #222;
  font-weight: 600;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Indices = styled.div<{ bgColor: string; fontColor?: string }>`
  /* padding: 5px; */

  width: 50px;
  height: 25px;

  background: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor ?? "white"};

  font-family: Fira Code;
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tems: NextPage<TemProps> = ({ tems }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();

  const { toggleBetweenLightAndDarkMode } = useThemeController();

  const colors = [
    {
      color: { key: "focal", colorSpread: theme.colors.focal },
      onColor: { key: "onFocal", colorSpread: theme.colors.onFocal },
    },
    {
      color: { key: "subfocal", colorSpread: theme.colors.subfocal },
      onColor: { key: "onSubfocal", colorSpread: theme.colors.onSubfocal },
    },
    {
      color: { key: "surface", colorSpread: theme.colors.surface },
      onColor: { key: "onSurface", colorSpread: theme.colors.onSurface },
    },
    {
      color: { key: "hypoface", colorSpread: theme.colors.hypoface },
      onColor: { key: "onHypoface", colorSpread: theme.colors.onHypoface },
    },
  ];

  console.log(tems);

  return (
    <Container ref={containerRef}>
      <Header onClick={toggleBetweenLightAndDarkMode}>Temtems</Header>
      <Palette>
        {colors.map(({ color, onColor }) => (
          <ColorGroup key={color.key + onColor.key}>
            <ColorRow>
              <SpreadTitle>index</SpreadTitle>
              {color.colorSpread.map((c, i) => (
                <Indices
                  key={color.key + c + i}
                  bgColor={"#bbb"}
                  fontColor={"#555"}
                >
                  {i}
                </Indices>
              ))}
            </ColorRow>
            <ColorRow>
              <SpreadTitle>{color.key}</SpreadTitle>
              {color.colorSpread.map((c, i) => (
                <Square
                  key={color.key + c + i}
                  bgColor={c}
                  fontColor={onColor.colorSpread[i]}
                >
                  text
                </Square>
              ))}
            </ColorRow>
            <ColorRow>
              <SpreadTitle>{onColor.key}</SpreadTitle>
              {onColor.colorSpread.map((c, i) => (
                <Square key={onColor.key + c + i} bgColor={c}></Square>
              ))}
            </ColorRow>
          </ColorGroup>
        ))}
      </Palette>
      <List>
        {/* {tems.slice(0, 80).map((v) => ( */}
        {tems.map((v) => (
          <TemCard
            key={v.number}
            number={v.number}
            name={v.name}
            types={v.types}
            traits={v.traits}
            stats={v.stats}
            tvYields={v.tvYields}
            imgStaticUrl={v.wikiRenderStaticUrl}
            imgAnimatedUrl={v.wikiRenderAnimatedUrl}
            imgStaticLumaUrl={v.wikiRenderStaticLumaUrl}
            imgAnimatedLumaUrl={v.wikiRenderAnimatedLumaUrl}
          />
        ))}
      </List>
    </Container>
  );
};

export default Tems;
