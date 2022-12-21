import type { NextPage } from "next";
import { useRouter } from "next/router";

const Tem: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>{id}</div>;
};

export default Tem;
