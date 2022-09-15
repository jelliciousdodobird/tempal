import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const Row = styled.div`
  display: flex;
  gap: 1px;
`;

const Tem: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Container>{id}</Container>;
};

export default Tem;
