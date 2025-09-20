import { getListBots } from "@/actions/get-list-bots";

const Home = async () => {
  const bots = await getListBots("123");
  return <>bots: {JSON.stringify(bots)}</>;
};
export default Home;
