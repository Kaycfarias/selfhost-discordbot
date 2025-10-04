import { getListBots } from "@/actions/get-list-bots";
import DashboardLayout from "@/components/dashboard-layout";

const Home = async () => {
  const bots = await getListBots("123");
  return <DashboardLayout>bots: {JSON.stringify(bots)}</DashboardLayout>;
};
export default Home;
