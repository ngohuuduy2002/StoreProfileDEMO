import ChipProfile from "@/components/createStore/ChipProfile";
import Divider from "@/components/createStore/Divider";
import StoreProfile from "@/components/createStore/StoreProfile";
import React from "react";

const CreateStore = () => {
  return (
    <div>
      <div>
        <Divider item={"Store Profile"} />
        <StoreProfile />
      </div>
      <div>
        <Divider item={"Chip's Profile"} />
        <ChipProfile />
      </div>
    </div>
  );
};

export default CreateStore;
