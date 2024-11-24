import Layout from "@/components/layout/Layout";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Chat Room #{id}</h1>
        {/* Chat room interface will go here */}
      </div>
    </Layout>
  );
};

export default ChatRoom;