import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { TemCard } from "../../components/TemCard/TemCard.component";
import { contentCenter } from "../../styles/content-centerer";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => contentCenter(theme)};
`;

const List = styled.div`
  /* border: 1px dashed red; */

  width: 100%;

  display: grid;
  gap: 1rem;

  /* 18rem -> supports 280px devices */
  /* 21.5rem -> supports 280px devices */
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  /* grid-template-rows: repeat(auto-fit, minmax(12rem, 12rem)); */

  /* display: flex;
  flex-direction: row; */

  /* flex-wrap: wrap; */
  /* gap: 1rem; */
`;

const Centerer = styled.div`
  width: 100%;
  height: 14rem;

  background: gold;

  border-radius: 20px;

  span {
    color: black;
  }

  display: flex;
  flex-direction: column;
`;

type TemProps = {
  tems: any[];
};

export const getStaticProps: GetStaticProps<TemProps> = async () => {
  const res = await axios.get("https://temtem-api.mael.tech/api/temtems", {
    params: {
      // fields: "name"
    },
  });
  const data = await res.data;
  return {
    props: { tems: data }, // will be passed to the page component as props
  };
};

const Tems: NextPage<TemProps> = ({ tems }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  console.log(tems);
  return (
    <Container ref={containerRef}>
      <List>
        {tems.map((v) => (
          <TemCard
            key={v.number}
            number={v.number}
            name={v.name}
            types={v.types}
            imgUrl={`https://temtem-api.mael.tech/${v.icon}`}
          />
        ))}
      </List>
    </Container>
  );
};

export default Tems;
