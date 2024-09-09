"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  QuerySnapshot,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { motion } from "framer-motion";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "0" });
  const [deleteItem, setDeleteItem] = useState({ name: "", price: "0" });
  const [total, setTotal] = useState(0);
  const [itemToEdit, setItemToEdit] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);

  //Fetching items from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const itemsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(itemsArr);

      // Calculate total after setting items
      calculateTotal(itemsArr);
    });

    return () => unsubscribe();
  }, []);

  const calculateTotal = (itemsArray) => {
    const totalPrice = itemsArray.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    setTotal(totalPrice);
  };

  //Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name === "" || newItem.price < 0) return;
    else {
      //if the item already exists, prompt user a modal say it already exist
      const itemExists = items.find(
        (item) =>
          item.name.trim().toLowerCase() ===
            newItem.name.trim().toLowerCase() &&
          parseFloat(item.price).toFixed(2) ===
            parseFloat(newItem.price).toFixed(2)
      );

      if (itemExists) {
        alert("Item with the same price already exists");
        return;
      } else {
        await addDoc(collection(db, "items"), {
          name: newItem.name.trim(),
          price: newItem.price.trim(),
        });
      }
    }

    //Reset the form after submitting
    setNewItem({ name: "", price: 0 });
  };

  // Remove item from Firestore
  const removeItem = async (e) => {
    e.preventDefault();
    try {
      // Find item that matches the name and price
      const itemToRemove = items.find(
        (item) =>
          item.name.trim().toLowerCase() ===
            deleteItem.name.trim().toLowerCase() &&
          parseFloat(item.price).toFixed(2) ===
            parseFloat(deleteItem.price).toFixed(2)
      );

      if (itemToRemove) {
        await deleteDoc(doc(db, "items", itemToRemove.id));
        setDeleteItem({ name: "", price: "0" }); // Reset deleteItem state
      } else {
        if (deleteItem.price === "" || deleteItem.price < parseFloat(0)) {
          alert("Please enter a valid price");
        }
        alert("Item not found");
      }
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  //Edit item from database
  const editItem = async () => {};

  //Open modal to edit item
  const handleEditClick = (item) => {
    setItemToEdit(item);
    setEditModalOpen(true);
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    if (itemToEdit.price <= 0) {
      await deleteDoc(doc(db, "items", itemToEdit.id));
      setEditModalOpen(false);
    } else {
      await updateDoc(doc(db, "items", itemToEdit.id), {
        name: itemToEdit.name,
        price: itemToEdit.price,
      });
      setEditModalOpen(false);
    }
  };

  const handleEditChange = (e) => {
    setItemToEdit({ ...itemToEdit, [e.target.name]: e.target.value });
  };



  //Setting the toggle mode
  const handleSubmit = (e) => {
    e.preventDefault();
    if (toggleMode) {
      removeItem();
    } else {
      addItem();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center sm:flex-row">
          Expense Tracker
        </h1>
        <motion.div
          className="bg-slate-800 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <label className="flex flex-row mb-4 items-center cursor-pointer justify-center">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={() => setToggleMode(!toggleMode)}
            />
            <div className="relative items-center justify-center w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {toggleMode ? "Removing Item" : "Adding Item"}
            </span>
          </label>
          <form
            className="grid lg:grid-cols-2 text-black gap-2 sm:grid-cols-1"
            onSubmit={handleSubmit}
          >
            <input
              value={toggleMode ? deleteItem.name : newItem.name}
              onChange={(e) =>
                toggleMode
                  ? setDeleteItem({ ...deleteItem, name: e.target.value })
                  : setNewItem({ ...newItem, name: e.target.value })
              }
              className="col-span-2 p-3 border sm:col-span-1"
              type="text"
              placeholder={toggleMode ? "Remove Item" : "Add item"}
            />
            <input
              value={toggleMode ? deleteItem.price : newItem.price}
              onChange={(e) =>
                toggleMode
                  ? setDeleteItem({ ...deleteItem, price: e.target.value })
                  : setNewItem({ ...newItem, price: e.target.value })
              }
              className="col-span-2 p-3 border sm:col-span-1"
              type="number"
              placeholder="Enter $"
            />
            <button
              className="col-span-2 text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl sm:col-span-2"
              type="submit"
              onClick={toggleMode ? removeItem : addItem}
            >
              {toggleMode ? "Remove" : "Add"}
            </button>
          </form>

          <ul className="text-white">
            {items.map((item, id) => {
              return (
                <li
                  key={id}
                  className="my-4 bg-slate-950 w-full flex justify-between"
                >
                  <div className="p-4 w-full flex justify-between">
                    <span className="capitalize">{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                  <button
                    className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                </li>
              );
            })}
          </ul>
          {editModalOpen && (
            <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
            onClick={(e) => {
              if(e.target === e.currentTarget) {
                setEditModalOpen(false);
              }
            }}>
              <div className="bg-slate-800 p-4 rounded-lg items-center">
                <form onSubmit={handleEditItem}>
                  <div className="flex flex-col">
                    <span className="text-white items-center text-center mb-4">
                      Edit Item
                    </span>

                    <div className="mb-4">
                      <label>
                        Item Name:
                        <input
                          className="bg-slate-500 p-2 w-full rounded-lg"
                          type="text"
                          name="name"
                          value={itemToEdit.name}
                          onChange={handleEditChange}
                        ></input>
                      </label>
                    </div>
                    <label className="col-span-1">
                      Item Price:
                      <input
                        className="bg-slate-500 p-2 w-full rounded-lg"
                        type="number"
                        name="price"
                        value={itemToEdit.price}
                        onChange={handleEditChange}
                      ></input>
                    </label>
                  </div>
                  <div className="justify-center items-center text-center">
                    <button
                      type="submit"
                      className="bg-slate-950 hover:bg-slate-500 w-1/2 mt-4 text-white rounded-lg"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span>Total: </span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
