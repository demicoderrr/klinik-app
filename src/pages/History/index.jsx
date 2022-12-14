import React, { useEffect, useState, useMemo } from "react";
import Table from "../../components/Table";
import { AiFillEye } from "react-icons/ai";
import { ButtonIcon } from "../../components/Button";
import HistoryData from "../../data/HistoryData.json";
import HistoryModal from "./HistoryModal";

export default function History() {
  const [history, setHistory] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const historyData = HistoryData[0].now;

  const handleClose = () => {
    setShowHistory(false);
  };

  // useEffect(() => {
  //   setHistory(historyData);
  // }, []);

  const cols = [
    {
      Header: "No.",
      Cell: (row) => {
        return <div>{Number(row.row.index + 1)}</div>;
      },
    },
    {
      Header: "Nama Pasien",
      accessor: "nama",
    },
    {
      Header: "Tanggal",
      accessor: "tanggal",
    },
    {
      Header: "Dokter yang menangani",
      accessor: "dokter",
    },
    {
      Header: "Tindakan",
      accessor: "tindakan",
    },
    {
      Header: "Action",
      accessor: (row, i) => (
        <>
          <div>
            <ButtonIcon
              bgColor="bg-red-400"
              hoverColor="hover:bg-red-500"
              onClick={() => {
                console.log("view");
                setShowHistory(!showHistory);
              }}
              icon={<AiFillEye />}
            />
          </div>
        </>
      ),
      id: "action",
    },
  ];

  const columns = useMemo(() => cols, [cols]);
  const data = useMemo(() => historyData, []);

  return (
    <>
      <div className="mb-5">
        <h1>History</h1>
        <p>History data transaksi pasien</p>
      </div>

      <Table columns={columns} data={data} />
      {showHistory && (
        <HistoryModal handleClose={handleClose} historyData={historyData} />
      )}
    </>
  );
}
