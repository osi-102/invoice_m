import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Home = () => {
  const [total, setTotal] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState(12);
  const [totalMonthCollection, setTotalMonthCollection] = useState(1224);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getData();
    createChart();
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
    setInvoices(data);
    console.log(data);
    getOverallTotal(data);
  };

  const getOverallTotal = (invoiceList) => {
    let total = 0;
    invoiceList.forEach((data) => {
      // Ensure total is added as a number
      total += parseFloat(data.total) || 0;
    });
    console.log(total);
    setTotal(total);
    // setTotal(total.toFixed(2)); // To limit to two decimal places if needed
  };

  const createChart = () => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div>
      <div className="flex gap-10 justify-between ml-10 mr-10 mt-5">
        <div className="flex flex-col justify-center items-center w-1/3 h-60 bg-red-600">
          <h1>Rs. {total}</h1>
          <p>Overall</p>
        </div>
        <div className="flex flex-col justify-center items-center w-1/3 h-60 bg-red-600">
          <h1>Rs. {totalInvoice}</h1>
          <p>Invoices</p>
        </div>
        <div className="flex flex-col justify-center items-center w-1/3 h-60 bg-red-600">
          <h1>Rs. {totalMonthCollection}</h1>
          <p>Month Collection</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/3">
          <canvas id="myChart"></canvas>
        </div>
        <div className="w-1/3 bg-white">
          Recent Invoices
        </div>
      </div>
    </div>
  );
};

export default Home;
