import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    // console.log("Invoices Component");
  }, []);

  const getData = async () => {
    const q = query(
      collection(db, "INVOICES"),
      where("uid", "==", localStorage.getItem("uid"))
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log(data);
    setInvoices(data);
  };

  const deleteInvoice = async (id) => {
    const isSure = window.confirm(
      "Are you sure you want to delte this Invoice"
    );
    if (isSure) {
      try {
        await deleteDoc(doc(db, "INVOICES", id));
        getData();
      } catch {
        window.alert("Something Wrong");
      }
    }
    // console.log(id);
  };

  return (
    <div>
      {/* <h1>All Invoices</h1> */}
      {invoices.map((data) => (
        <div className="flex gap-20 bg-white mt-5 p-2" key={data.id}>
          <p className="w-1/5">{data.clientName}</p>
          <p className="w-1/5">{data.total}</p>
          <button
            onClick={() => {
              navigate("/dashboard/invoice-detail", { state: data });
            }}
          >
            View
          </button>
          <button
            onClick={() => {
              deleteInvoice(data.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Invoices;
