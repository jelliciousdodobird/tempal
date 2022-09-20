import { css } from "@emotion/react";
import styled from "@emotion/styled";
// import Image from "next/image";
import { useEffect, useState } from "react";
import {
  TemType,
  temTypeColorMap,
  TemTypeColorShades,
} from "../../data/temtems";
import { Stats, StatsWithTotal } from "../../pages/tems";
import { zeroPad } from "../../utils/utils";

import TemCardTip from "../../../public/assets/shape.svg";
import TemCardBottomTip from "../../../public/assets/bottom-tip.svg";
import { Icon3dRotate } from "@tabler/icons";

import Image from "next/future/image";

const Container = styled.div`
  /* border: 1px dashed gray; */
  position: relative;

  width: 100%;
  min-height: 25rem;
  max-height: 25rem;

  margin-top: 4rem;
  /* margin-top: 6rem; */

  display: flex;
  flex-direction: row;
`;

const CardBackground = styled.div`
  position: absolute;
  /* bottom: 0; */

  /* z-index: 100; */

  /* background: ${({ theme }) => theme.colors.surface[6]}; */
  /* background: red; */

  /* border-radius: 5px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px; */

  /* border-radius: 5px; */
  /* overflow: hidden; */

  height: 100%;
  width: 100%;
  /* margin: 1rem; */

  padding: 3px;

  /* border: 1px solid ${({ theme }) => theme.colors.surface[8]}; */
  /* box-shadow: inset 0px 0px 0px 1px ${({ theme }) =>
    theme.colors.surface[8]}; */

  /* box-shadow: ${({ theme }) => theme.shadows._30}; */

  /* clip-path: polygon(80% 0, 100% 20%, 100% 100%, 0 100%, 0 20%, 20% 0);
  clip-path: polygon(90% 0, 100% 10%, 100% 100%, 0 100%, 0 10%, 10% 0);
  clip-path: polygon(0 20px, 20px 0, -10px 0, 100% -10px, 100% 100%, 0 100%); */

  display: flex;
  justify-content: center;
`;

const Background = styled.div`
  position: relative;
  /* border: 1px dashed red; */

  border-radius: 5px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  overflow: hidden;

  background: ${({ theme }) => theme.colors.surface[6]};

  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 50px;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    user-select: none;

    width: 100%;
    height: 100%;

    object-fit: none;

    filter: blur(5px) opacity(0.3);
    transform: scale(6);
  }
`;

const MainImage = styled.div`
  /* border: 1px solid red; */
  position: absolute;
  bottom: 0;

  width: 128px;
  height: 128px;

  display: flex;

  img {
    user-select: none;

    width: 100%;
    height: 100%;

    object-fit: contain;
  }
`;

const ContentContainer = styled.div`
  /* border: 1px dashed blue; */

  position: absolute;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  /* border: 1px dashed blue; */

  padding: 0 2rem;

  width: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const edgeSize = 60;
const bottomSize = Math.round(Math.sqrt(2 * edgeSize * edgeSize));

const HeaderRow = styled.div`
  /* border: 1px dashed gold; */
  position: relative;

  width: 100%;
  height: ${edgeSize}px;
  max-height: ${edgeSize}px;
  min-height: ${edgeSize}px;

  display: flex;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  /* padding: 0.5rem 1rem; */

  width: 100%;
  /* padding: 0 1rem; */

  height: min-content;

  /* background: hsl(0, 0%, 25%, 1); */
  /* background: ${({ theme }) => theme.colors.surface[8]}; */

  /* clip-path: polygon(
    39% 1%,
    66% 5%,
    98% 2%,
    100% 31%,
    96% 66%,
    100% 94%,
    48% 99%,
    2% 97%,
    1% 47%,
    5% 4%
  ); */

  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Spacer = styled.div`
  flex: 1;
`;

const shadow = "0px -3px 10px rgba(0, 0, 0, 0.1)";

const TopLeftTip = styled.div`
  position: relative;

  width: ${edgeSize}px;
  height: ${edgeSize}px;

  /* padding: 1rem; */

  display: flex;
  /* justify-content: center; */
  /* align-items: center; */

  svg {
    position: absolute;
    width: 100%;
    filter: drop-shadow(${shadow});

    path {
      color: ${({ theme }) => theme.colors.surface[4]};
    }
  }

  &:hover {
    svg {
      path {
        color: ${({ theme }) => theme.colors.subfocal[5]};
      }
    }
  }
`;

const TopRightTip = styled.div`
  /* border: 1px solid red; */

  position: relative;

  width: ${edgeSize}px;
  height: ${edgeSize}px;

  display: flex;
  justify-content: flex-end;
  /* align-items: flex-end; */

  svg {
    position: absolute;
    width: 100%;

    transform: rotate(90deg);
    filter: drop-shadow(${shadow});

    path {
      color: ${({ theme }) => theme.colors.surface[4]};
    }
  }

  img {
    user-select: none;
    margin: 8px;
    position: absolute;
  }

  &:hover {
    svg {
      path {
        color: ${({ theme }) => theme.colors.subfocal[5]};
      }
    }
  }
`;

const BottomTip = styled.div`
  /* outline: 1px dashed blue; */

  position: relative;

  width: 84px;
  height: 47px;
  /* height: fit-content; */

  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;

  padding-bottom: 1rem;

  svg {
    position: absolute;
    bottom: 0;
    /* left: 0; */
    width: 100%;
    /* height: 100%; */

    filter: drop-shadow(${shadow});

    /* transform: rotate(45deg); */

    path {
      color: ${({ theme }) => theme.colors.surface[4]};
    }
  }

  &:hover {
    svg {
      path {
        color: ${({ theme }) => theme.colors.subfocal[5]};
      }
    }
  }
`;

const Header = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Name = styled.span`
  user-select: none;

  font-weight: 600;
  font-size: 14px;

  white-space: nowrap;

  display: flex;
  justify-content: center;
  align-items: center;

  /* padding: 3px 6px; */
  /* clip-path: polygon(12% 0, 100% 8%, 95% 96%, 14% 100%, 1% 66%); */
`;

const Number = styled.span`
  /* z-index: 1; */
  /* position: relative; */

  user-select: none;
  /* border: 1px solid gold; */

  font-family: Fira Code;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurface[0]};
  color: hsl(0, 0%, 100%, 0.4);

  /* padding: 10px 14px; */

  /* width: min-content; */
  /* height: min-content; */

  display: flex;
  justify-content: center;
  align-items: center;

  /* clip-path: polygon(12% 8%, 98% 2%, 98% 99%, 1% 95%); */
  /* clip-path: polygon(12% 8%, 97% 7%, 92% 96%, 4% 84%); */
  /* clip-path: polygon(94% 4%, 99% 83%, 51% 99%, 1% 85%, 10% 8%); */
`;

const ElementHolder = styled.div`
  display: flex;
  gap: 0.25rem;

  flex-wrap: wrap;

  /* overflow: hidden; */
  /* white-space: nowrap; */
  /* justify-content: space-between; */
`;

const ElementType = styled.span<{ colorShades: TemTypeColorShades }>`
  padding: 3px 5px;
  /* clip-path: polygon(38% 4%, 78% 1%, 100% 5%, 98% 96%, 7% 98%, 1% 46%, 4% 1%); */

  /* border-radius: 1rem; */
  border-radius: 3px;

  text-transform: capitalize;

  color: ${({ colorShades }) => colorShades.dark};
  background: ${({ colorShades }) => colorShades.base};

  font-weight: 600;
  font-size: 12px;
`;

const StatsContainer = styled.div`
  /* border: 1px solid red; */
  /* background: hsl(0, 0%, 25%, 1); */
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const StatLineContainer = styled.div`
  /* border: 1px solid green; */
  position: relative;

  width: 100%;

  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 5px;
`;

const MaxStatLine = styled.div`
  position: relative;

  /* border: 1px solid gold; */
  /* border-radius: 12px; */
  /* overflow: hidden; */

  box-shadow: inset 0px 0px 0px 1px cyan;
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.surface[10]};
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.focal[5]};
  box-shadow: inset 0px 0px 0px 1px hsl(0, 0%, 100%, 0.1);

  width: 100%;
`;

const StatLine = styled.div<{ fillPercentage: number }>`
  /* border: 1px dashed red; */
  width: ${({ fillPercentage }) => fillPercentage}%;
  border-radius: 12px;

  height: 3px;
  background: cyan;
  background: ${({ theme }) => theme.colors.surface[10]};
  background: ${({ theme }) => theme.colors.focal[5]};
  background: gold;

  /* border-radius: 5px; */
  /* height: 5px; */
  display: flex;
  font-size: 10px;
  /* color: #222; */
  font-weight: 700;
`;

const pillStyle = css`
  /* outline: 1px solid green; */

  /* padding: 0 4px; */

  /* mix-blend-mode: difference; */
  /* color: cyan; */

  font-family: Fira Code;
  font-size: 10px;
  font-weight: 600;

  text-transform: uppercase;
`;

const StatLabel = styled.span`
  /* position: absolute; */
  /* right: 0; */

  /* width: 4rem; */
  width: 50px;

  color: ${({ theme }) => theme.colors.hypoface[7]};

  /* mix-blend-mode: screen; */

  color: hsl(0, 0%, 100%, 0.4);

  ${pillStyle}

  font-weight: 400;
`;

const StatValue = styled.span`
  /* mix-blend-mode: difference; */
  width: 50px;

  padding-right: 10px;

  display: flex;
  justify-content: flex-end;

  /* padding: 0 6px; */
  color: white;
  ${pillStyle}
`;

const Trait = styled.span`
  background: #222;
  background: ${({ theme }) => theme.colors.surface[10]};

  padding: 6px 6px;
  padding: 3px 5px;

  font-size: 12px;
  font-weight: 400;
  /* clip-path: polygon(
    28% 7%,
    76% 3%,
    98% 4%,
    100% 40%,
    98% 96%,
    78% 99%,
    30% 95%,
    1% 99%,
    3% 3%
  ); */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const H3 = styled.h3`
  /* font-family: Fira Code; */
  font-size: 12px;
  font-weight: 500;

  /* color: white; */
`;

const circleSize = 5;

const StepCircle = styled.div`
  z-index: 1;
  position: relative;

  border-radius: 50%;

  width: ${circleSize}px;
  height: ${circleSize}px;

  background: ${({ theme }) => theme.colors.surface[10]};
`;

const FloatName = styled.div`
  position: absolute;
  top: -3rem;
  left: 0;

  padding: 5px;

  /* color: white; */
  font-weight: 600;
  font-size: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface TemCardProps {
  name: string;
  number: number;
  types: [TemType, TemType | null];
  traits: [string, string];
  stats: StatsWithTotal;
  tvYields: Stats;

  imgStaticUrl: string;
  imgAnimatedUrl: string;
  imgStaticLumaUrl: string;
  imgAnimatedLumaUrl: string;
}

export const TemCard = ({
  number,
  name,
  types,
  stats,
  traits,
  tvYields,

  imgStaticUrl,
  imgAnimatedUrl,
  imgStaticLumaUrl,
  imgAnimatedLumaUrl,
}: TemCardProps) => {
  const [showLuma, setShowLuma] = useState(false);
  const [hovering, setHovering] = useState(false);

  const maxStat = 125;
  const type1 = (types[0] ? types[0].toLowerCase() : "neutral") as TemType;
  const type2 = (types[1] ? types[1].toLowerCase() : null) as TemType;

  const trait1 = traits[0];
  const trait2 = traits[1];

  const index = name.indexOf("(");
  const formattedName = index !== -1 ? name.slice(0, index) : name;

  const formattedNumber = zeroPad(number, 3);

  const staticImg = showLuma ? imgStaticLumaUrl : imgStaticUrl;
  const animatedImg = showLuma ? imgAnimatedLumaUrl : imgAnimatedUrl;
  const mainImgUrl = hovering ? animatedImg : staticImg;

  return (
    <Container
      tabIndex={1}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onPointerOver={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <CardBackground>
        <Background>
          <Image
            alt=""
            src={staticImg}
            width={128}
            height={128}
            quality={100}
          />
        </Background>
      </CardBackground>
      <ContentContainer>
        {/* <FloatName>{formattedName}</FloatName> */}

        <HeaderRow>
          <TopLeftTip>
            <TemCardTip />
            {/* <Number>{formattedNumber}</Number> */}
          </TopLeftTip>
          <Spacer />
          <TopRightTip onClick={() => setShowLuma((v) => !v)}>
            <TemCardTip />

            {/* <Number> */}
            <Image
              alt="luma"
              src="https://temtem.wiki.gg/images/4/42/Luma_icon.png"
              width={16}
              height={16}
            />
            {/* </Number> */}
          </TopRightTip>
          <MainImage>
            <Image
              alt={formattedName}
              src={mainImgUrl}
              width={128}
              height={128}
              quality={100}
            />
          </MainImage>
          {/* <Name>{formattedName}</Name> */}
        </HeaderRow>

        <MainContent>
          <Header>
            <Number>#{formattedNumber}</Number>
            <Name>{formattedName}</Name>
          </Header>

          <Row>
            <H3>Type</H3>
            <ElementHolder>
              <ElementType colorShades={temTypeColorMap[type1]}>
                {type1}
              </ElementType>
              {type2 && (
                <ElementType colorShades={temTypeColorMap[type2]}>
                  {type2}
                </ElementType>
              )}
            </ElementHolder>
          </Row>

          <StatsContainer>
            {Object.entries(stats).map(([stat, value]) => (
              <StatLineContainer key={stat}>
                <StatLabel>{stat}</StatLabel>
                <StatValue>{value}</StatValue>
                <MaxStatLine>
                  {stat !== "total" && (
                    <StatLine
                      fillPercentage={Math.min(100, (value / maxStat) * 100)}
                    />
                  )}
                </MaxStatLine>
              </StatLineContainer>
            ))}
          </StatsContainer>

          {/* <Row>
            <H3>Traits</H3>

            <ElementHolder>
              <Trait>{trait1}</Trait>
              <Trait>{trait2}</Trait>
            </ElementHolder>
          </Row>

          <Row>
            <H3>TVs</H3>
            <ElementHolder>
              {Object.entries(tvYields)
                .filter(([stat, value]) => value !== 0)
                .map(([stat, value]) => (
                  <PillLabel
                    key={stat}
                    value={value}
                    label={stat.toUpperCase()}
                  />
                ))}
            </ElementHolder>
          </Row> */}

          {/* <Row>
            <H3>Type Matchups</H3>
            <ElementHolder>
              <ElementType colorShades={temTypeColorMap[type1]}>
                {type1}
              </ElementType>
              {type2 && (
                <ElementType colorShades={temTypeColorMap[type2]}>
                  {type2}
                </ElementType>
              )}
            </ElementHolder>
          </Row> */}
        </MainContent>

        <BottomTip>
          <TemCardBottomTip />

          <StepCircle></StepCircle>
          <StepCircle></StepCircle>
          <StepCircle></StepCircle>
        </BottomTip>
      </ContentContainer>
    </Container>
  );
};

const PillContainer = styled.div`
  position: relative;

  border-radius: 12px;
  overflow: hidden;

  box-shadow: inset 0px 0px 0px 1px gold;
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.focal[0]};

  display: flex;
`;

const PillLabelText = styled.span`
  padding: 0px 5px;

  font-size: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PillValueText = styled.span`
  font-family: Fira Code;
  font-size: 10px;
  padding: 0 5px 0 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PillBackground = styled.div`
  background: gold;
  background: ${({ theme }) => theme.colors.focal[5]};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface PillLabelProps {
  label: string | number | null | undefined;
  value: string | number | null | undefined;
}
const PillLabel = ({ label, value }: PillLabelProps) => {
  return (
    <PillContainer>
      <PillBackground>
        <PillLabelText>{label}</PillLabelText>
      </PillBackground>
      <PillValueText>{value}</PillValueText>
    </PillContainer>
  );
};
