import Navbar from "../components/Navbar/Navbar";
import Bucketliste from "../components/Bucketlist/Bucketlist"
import TopBar from "../components/TopBar/TopBar";

function Bucketlist() {
  return (
    <>
    <TopBar pagename={"Ma Bucketlist"}/>
      <Bucketliste/>
      <Navbar/>
    </>
  );
}

export default Bucketlist;
