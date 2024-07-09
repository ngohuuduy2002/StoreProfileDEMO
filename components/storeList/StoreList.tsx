"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Card, Row, Pagination, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import AddStoreButton from "./AddStoreButton";

interface Store {
  key: number;
  storeName: string;
  address: string;
}

const StoreList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage: number = 8;

  useEffect(() => {
    axios
      .get("/api/stores")
      .then((response) => {
        console.log("Received response:", response);
        setStores(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
        message.error("Failed to fetch store data");
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <AddStoreButton />
      <Row gutter={[16, 16]}>
        {currentItems.map((store) => (
          <Col span={6} key={store.key}>
            <Card style={{ borderColor: "#D1D1D1", borderRadius: "20px" }}>
              <Link href={`/createStore`}>
                <div className="w-full flex justify-center py-3">
                  <Image
                    src={"/store/store-icon.jpg"}
                    alt="store"
                    width={200}
                    height={200}
                    className=""
                  />
                </div>
                <div className="flex flex-col text-black border-t-2 py-2 px-5">
                  <h1 className=" text-2xl font-bold">{store.storeName}</h1>
                  <p className=" text-gray-400">{store.address}</p>
                </div>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={stores.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "20px", textAlign: "center", width: "100%" }}
      />
    </>
  );
};

export default StoreList;
