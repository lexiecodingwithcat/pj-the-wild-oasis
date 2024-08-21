// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
function Cabins() {
  // useEffect(
  //   function () {
  //     getCabins().then((data) => console.log(data));
  //   },
  //   [getCabins]
  // );
  const [showForm, setShowForm] = useState(false);

  return (
    // because we want the children element only return the main section, no other div to affect the styles
    //so we only return fragement
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/ sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
