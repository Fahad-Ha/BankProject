import React, { useContext, useState } from "react";
import { me, balance, deposit, withdrawal } from "../api/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ProfileCard from "../component/ProfileCard";
import ErrorMsg from "../component/ErrorMsg";

const Profile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [errorMsgBalance, setErrorMsgBalance] = useState(false);
  const [errorMsgValue, setErrorMsgValue] = useState("");
  const [successOper, setSuccessOper] = useState(false);
  const [msgColor, setMsgColor] = useState("bg-red-500");

  //For Tabs
  const [selectedTab, setSelectedTab] = useState("tab1");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setErrorMsgBalance(false);
    setSuccessOper(false);
  };

  // Get profile data
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(),
  });

  // Get balance data
  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: () => balance(),
  });

  // Deposit funds
  const { mutate: depositFun, isLoading: depositLoading } = useMutation({
    mutationFn: () => {
      if (amount > 0) {
        setMsgColor("bg-green-500");
        setErrorMsgValue("Success Deposit Amount: " + amount);
        return deposit(amount);
      } else {
        setMsgColor("bg-red-500");
        setErrorMsgValue("Please, enter a valid amount to deposit.");
        setErrorMsgBalance(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]);
      setAmount(0);
      document.getElementById("amount").value = "";
      setSuccessOper(true);
    },
  });

  // Withdraw funds
  const [amountWit, setAmountWit] = useState(0);
  const { mutate: withdrawalFun, isLoading: withdrawalLoading } = useMutation({
    mutationFn: () => {
      if (balanceData >= amountWit && amountWit > 0) {
        setMsgColor("bg-green-500");
        setErrorMsgValue("Success Withdrawal Amount: " + amountWit);
        return withdrawal(amountWit);
      } else {
        setMsgColor("bg-red-500");
        setErrorMsgValue("Insufficient balance, cannot withdraw");
        return setErrorMsgBalance(true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]);
      setAmountWit(0);
      document.getElementById("amountWit").value = "";
      setSuccessOper(true);
    },
  });

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
  };

  if (!user) return <Navigate to="/" />;
  if (!profile) return <div>not found!</div>;

  const { username, account, image } = profile;

  return (
    <div className="flex flex-col justify-center items-center  bg-gradient-to-r from-blue-400 to-indigo-400 min-h-screen md:min-h-[90.7vh] xl:min-h-[95vh]">
      {errorMsgBalance || successOper ? (
        <div className="w-full text-white px-4 md:px-52 mt-[-93.8vh] md:mt-[-83vh] xl:mt-[-91vh] absolute font-semibold">
          <ErrorMsg msg={errorMsgValue} color={msgColor} />
        </div>
      ) : null}
      <div className="mt-10 md:mt-0 mx-auto">
        {/*
        onClick={() => {
          navigate("/transactions");
        }}
      > */}
        <ProfileCard
          username={username}
          account={account}
          image={image}
          balance={balanceData}
        />
      </div>
      {/* </div> */}
      <button
        onClick={() => {
          navigate("/transactions");
        }}
        className="h-20 w-64 md:w-80 mb-6 bg-gray-800 text-white rounded-full mt-5 flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out xl:mt-24"
      >
        {`Balance: ${balanceData} KD `}
      </button>

      {/* Tabs Starts */}

      <div className="flex flex-col bg-gradient-to-br from-gray-50 to-indigo-200 rounded-md p-8 md:p-4 shadow-xl mt-4 m-32  sm:m-0">
        <div className="flex flex-col">
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handleTabClick("tab1")}
              className={`px-4 py-2 mr-2 rounded ${
                selectedTab === "tab1"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => handleTabClick("tab2")}
              className={`px-4 py-2 rounded ${
                selectedTab === "tab2"
                  ? "bg-red-500 hover:bg-red-600  text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Withdraw
            </button>
          </div>
          <div className="mx-[-20vh] sm:mx-0">
            {selectedTab === "tab1" && (
              <form
                onSubmit={handleBalanceSubmit}
                className="mt-8 mx-24 text-center sm:mx-0"
              >
                <label
                  htmlFor="amount"
                  className="mr-2 flex flex-col md:inline-block "
                >
                  Amount:
                </label>
                <input
                  className="bg-gray-100  px-2 py-1 rounded"
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="amount"
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={depositFun}
                  disabled={depositLoading}
                  className="w-40 h-9 my-6 md:my-0 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out sm:ml-4"
                >
                  {depositLoading ? "Adding Funds..." : "Add Funds"}
                </button>
              </form>
            )}
            {selectedTab === "tab2" && (
              <form
                onSubmit={handleBalanceSubmit}
                className="mt-8 mx-24  sm:mx-0 text-center"
              >
                <label
                  htmlFor="amount"
                  className="mr-2 flex flex-col sm:inline-block"
                >
                  Amount:
                </label>
                <input
                  className="bg-gray-100 px-2 py-1 rounded"
                  placeholder="amount"
                  type="number"
                  id="amountWit"
                  name="amountWit"
                  required
                  onChange={(e) => setAmountWit(e.target.value)}
                />

                <button
                  type="submit"
                  onClick={withdrawalFun}
                  disabled={withdrawalLoading}
                  className="w-40 h-9  my-6 sm:my-0 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out sm:ml-4"
                >
                  {withdrawalLoading ? "Withdrawing..." : "Withdrawal"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Tab Ends */}
    </div>
  );
};

export default Profile;
