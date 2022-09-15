import styled from "@emotion/styled";
import type { NextPage } from "next";
import { typeSquare } from "../data/temtems";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const Row = styled.div`
  display: flex;
  gap: 1px;
`;

const Square = styled.div<{ mod: number }>`
  width: 32px;
  height: 32px;
  background-color: ${({ mod }) =>
    mod === 2
      ? "hsl(120, 28%, 47%, 1)"
      : mod === 0.5
      ? "hsl(60, 74%, 37%, 1)"
      : "hsl(339, 41%, 13%, 1)"};
`;

const Home: NextPage = () => {
  return (
    <Container>
      {Object.values(typeSquare).map((row, i) => (
        <Row key={`row-${i}`}>
          {Object.values(row).map((mod, j) => (
            <Square key={`square-${i}-${j}`} mod={mod}>
              {mod === 1 ? "" : mod}
            </Square>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Home;
