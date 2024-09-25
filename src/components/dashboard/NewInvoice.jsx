import React, { useState } from 'react';
import { db } from '../../firebase';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { collection, addDoc } from 'firebase/firestore';

const NewInvoice = () => {
  const [clientName, setClientName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState([
    { itemName: '', itemDescription: '', quantity: 0, price: 0, totalItemPrice: 0, discount: 0, discountType: 'percent' }
  ]);
  const [total, setTotal] = useState(0);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;

    if (name === 'quantity' || name === 'price' || name === 'discount') {
      const quantity = parseFloat(newItems[index].quantity) || 0;
      const price = parseFloat(newItems[index].price) || 0;
      let discount = parseFloat(newItems[index].discount) || 0;

      if (newItems[index].discountType === 'percent') {
        discount = (discount / 100) * price;
      }
      newItems[index].totalItemPrice = (quantity * (price - discount)).toFixed(2);
    }

    setItems(newItems);
    calculateTotal(newItems);
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + parseFloat(item.totalItemPrice || 0), 0).toFixed(2);
    setTotal(sum);
  };

  const addItem = () => {
    setItems([...items, { itemName: '', itemDescription: '', quantity: 0, price: 0, totalItemPrice: 0, discount: 0, discountType: 'percent' }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotal(newItems);
  };

  const saveInvoiceToFirebase = async () => {
    const invoiceData = {
      clientName,
      contact,
      email,
      address,
      items,
      total,
    };

    try {
      await addDoc(collection(db, 'INVOICES'), invoiceData);
      alert('Invoice saved to Firebase successfully!');
    } catch (error) {
      console.error('Error saving invoice: ', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const userPhoto = localStorage.getItem('photoURL');
    const userName = localStorage.getItem('cName');

    doc.setFontSize(18);
    doc.text('Invoice', 20, 20);
    
    doc.addImage(userPhoto, 'JPEG', 160, 10, 40, 40); // Adding user logo
    doc.text(`User: ${userName}`, 20, 40);  // Adding user name
    
    doc.setFontSize(12);
    doc.text(`Client Name: ${clientName}`, 20, 60);
    doc.text(`Contact: ${contact}`, 20, 70);
    doc.text(`Email: ${email}`, 20, 80);
    doc.text(`Address: ${address}`, 20, 90);

    const itemRows = items.map(item => [
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
      startY: 100,
    });

    doc.text(`Total: $${total}`, 20, doc.autoTable.previous.finalY + 10);
    doc.save(`${clientName}.pdf`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">New Invoice</h1>
      <form className="space-y-4">
        <div>
          <label>Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="form-input w-full mt-1"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input w-full mt-1"
          />
        </div>
        <div>
          <label>Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="form-input w-full mt-1"
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-input w-full mt-1"
          />
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 items-center">
            <div>
              <label>Item Name</label>
              <input
                type="text"
                name="itemName"
                value={item.itemName}
                onChange={(e) => handleItemChange(index, e)}
                className="form-input mt-1"
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                name="itemDescription"
                value={item.itemDescription}
                onChange={(e) => handleItemChange(index, e)}
                className="form-input mt-1"
              />
            </div>
            <div>
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                className="form-input mt-1"
              />
            </div>
            <div>
              <label>Price per Item</label>
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
                className="form-input mt-1"
              />
            </div>
            <div>
              <label>Discount</label>
              <input
                type="number"
                name="discount"
                value={item.discount}
                onChange={(e) => handleItemChange(index, e)}
                className="form-input mt-1"
              />
              <select
                name="discountType"
                value={item.discountType}
                onChange={(e) => handleItemChange(index, e)}
                className="form-select mt-1"
              >
                <option value="percent">%</option>
                <option value="amount">$</option>
              </select>
            </div>
            <div>
              <label>Total</label>
              <input
                type="text"
                value={item.totalItemPrice}
                readOnly
                className="form-input mt-1 bg-gray-200"
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-4"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>

        <div>
          <label>Total Amount</label>
          <input
            type="text"
            value={total}
            readOnly
            className="form-input mt-1 bg-gray-200"
          />
        </div>

        <div className="space-x-4">
          <button
            type="button"
            onClick={saveInvoiceToFirebase}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Invoice
          </button>
          <button
            type="button"
            onClick={generatePDF}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Generate PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;
