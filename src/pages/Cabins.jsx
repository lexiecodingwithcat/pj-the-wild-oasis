// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import AddCabins from "../features/cabins/AddCabins";
import CabinTable from "../features/cabins/CabinTable"
import CabinTableOperatioins from "../features/cabins/CabinTableOperatioins";
function Cabins() {
  // useEffect(
  //   function () {
  //     getCabins().then((data) => console.log(data));
  //   },
  //   [getCabins]
  // );
 

  return (
    // because we want the children element only return the main section, no other div to affect the styles
    //so we only return fragement
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
     <CabinTableOperatioins />
      </Row>
      <Row>
        <CabinTable />
       <AddCabins/>
      </Row>
    </>
  );
}

export default Cabins;
