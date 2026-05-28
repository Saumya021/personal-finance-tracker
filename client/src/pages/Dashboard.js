import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const [filters, setFilters] = useState({
    category: "",
    type: "",
    search: "",
  });

  const fetchTransactions = async () => {
    const params = new URLSearchParams(filters).toString();

    const res = await API.get(`/transactions?${params}`);

    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", form);

      setForm({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });

      fetchTransactions();
    } catch (err) {
      alert("Failed to add transaction");
    }
  };

  const deleteTransaction = async (id) => {
    await API.delete(`/transactions/${id}`);

    fetchTransactions();
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "#f4f7fb",
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">
            Personal Finance Tracker
          </h1>

          <p className="text-gray-600 mt-1">
            Manage your income and expenses
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-green-400 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Total Income
          </h2>

          <p className="text-3xl mt-3">
            ₹{income}
          </p>
        </div>

        <div className="bg-red-400 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Total Expense
          </h2>

          <p className="text-3xl mt-3">
            ₹{expense}
          </p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Balance
          </h2>

          <p className="text-3xl mt-3">
            ₹{balance}
          </p>
        </div>
      </div>

      <form
        onSubmit={addTransaction}
        className="bg-white p-6 rounded-2xl shadow-lg mb-8"
      >
        <h2 className="text-2xl font-bold mb-5">
          Add Transaction
        </h2>

        <div className="grid md:grid-cols-5 gap-4">
          <input
            value={form.title}
            placeholder="Title"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            value={form.amount}
            type="number"
            placeholder="Amount"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                amount: Number(e.target.value),
              })
            }
          />

          <select
            value={form.type}
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
          >
            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>

          <input
            value={form.category}
            placeholder="Category"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <input
            value={form.date}
            type="date"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />
        </div>

        <button className="bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg mt-5">
          Add Transaction
        </button>
      </form>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-5">
          Filters
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Search"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
          />

          <input
            placeholder="Category"
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFilters({
                ...filters,
                category: e.target.value,
              })
            }
          />

          <select
            className="border p-3 rounded-lg"
            onChange={(e) =>
              setFilters({
                ...filters,
                type: e.target.value,
              })
            }
          >
            <option value="">
              All
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>
        </div>

        <button
          onClick={fetchTransactions}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg mt-5"
        >
          Apply Filters
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold">
                {transaction.title}
              </h2>

              <p className="text-gray-600 mt-1">
                ₹{transaction.amount} |{" "}
                {transaction.category} |{" "}
                {transaction.type}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {transaction.date?.slice(0, 10)}
              </p>
            </div>

            <button
              onClick={() =>
                deleteTransaction(transaction._id)
              }
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}