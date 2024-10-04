import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoiceDetail = () => {
  const location = useLocation();
  const [data] = useState(location.state); // Extract the passed invoice data

  // Retrieve company details from localStorage
  const companyName = localStorage.getItem('cName');
  const companyAddress = localStorage.getItem('companyAddress');
  const companyLogo = localStorage.getItem('photoURL');
  const companyContact = localStorage.getItem('companyContact');
  const companyEmail = localStorage.getItem('companyEmail');

  // Function to generate PDF without saving to Firebase
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Invoice', 20, 20);

    // Adding company logo and details
    if (companyLogo) {
      doc.addImage(companyLogo, 'JPEG', 160, 10, 40, 40); // Company logo
    }
    doc.text(`Company: ${companyName}`, 20, 40);
    doc.text(`Address: ${companyAddress}`, 20, 50);
    doc.text(`Contact: ${companyContact}`, 20, 60);
    doc.text(`Email: ${companyEmail}`, 20, 70);

    doc.setFontSize(12);
    doc.text(`Client Name: ${data.clientName}`, 20, 90);
    doc.text(`Contact: ${data.contact}`, 20, 100);
    doc.text(`Email: ${data.email}`, 20, 110);
    doc.text(`Address: ${data.address}`, 20, 120);

    const itemRows = data.items.map(item => [
      item.itemName,
      item.itemDescription,
      item.quantity,
      item.price,
      item.discount + (item.discountType === 'percent' ? '%' : ''),
      item.totalItemPrice
    ]);

    doc.autoTable({
      head: [['Item', 'Description', 'Quantity', 'Price', 'Discount', 'Total']],
      body: itemRows,
      startY: 130,
    });

    doc.text(`Total: $${data.total}`, 20, doc.autoTable.previous.finalY + 10);
    doc.save(`${data.clientName}-Invoice.pdf`);
  };

  return (
    <div className="h-screen p-6">
      <div className="w-1/2 bg-white h-5/6 m-auto p-4 shadow-md">
        {/* Invoice Header */}
        <div className="flex items-center p-2 mb-6">
          <img
            className="w-16 h-16 rounded-full"
            src={companyLogo}
            alt="Logo"
          />
          <div className="flex flex-col pl-4">
            <p className="font-bold text-lg">{companyName}</p>
            <p>{companyAddress}</p>
            <p>Contact: {companyContact}</p>
            <p>Email: {companyEmail}</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h2 className="font-bold text-xl mb-2">Customer Details</h2>
          <p><strong>Client Name:</strong> {data.clientName}</p>
          <p><strong>Contact:</strong> {data.contact}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Address:</strong> {data.address}</p>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <h2 className="font-bold text-xl mb-2">Items</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Discount</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.itemName}</td>
                  <td className="border p-2">{item.itemDescription}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">${item.price}</td>
                  <td className="border p-2">
                    {item.discount}
                    {item.discountType === 'percent' ? '%' : '$'}
                  </td>
                  <td className="border p-2">${item.totalItemPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Amount */}
        <div className="mt-4">
          <h2 className="font-bold text-xl">Total: ${data.total}</h2>
        </div>

        {/* Print Invoice Button */}
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={generatePDF}
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
