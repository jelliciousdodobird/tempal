import type { NextPage } from "next";
import { useRouter } from "next/router";

import { idPageContainer, row } from "./tems.css";

const Tem: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div className={idPageContainer}>{id}</div>;
};

export default Tem;
