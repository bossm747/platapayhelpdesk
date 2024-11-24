import Layout from "@/components/layout/Layout";
import { useParams } from "react-router-dom";

const TicketDetailsPage = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Ticket #{id}</h1>
        {/* Ticket details implementation will go here */}
      </div>
    </Layout>
  );
};

export default TicketDetailsPage;