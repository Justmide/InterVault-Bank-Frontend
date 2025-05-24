import React, { useEffect, useState } from "react";
import CardStyle from "./CardStyle";

const CreditCardDisplay = () => {
  const [cardDisplay, setCardDisplay] = useState([]);
  const [flippedCardIndex, setFlippedCardIndex] = useState(null);
  const [userBal, setUserBal ] = useState(0)

  const userDetails = JSON.parse(localStorage.getItem("customer"));
  const userId = userDetails?.id;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  const displayCard = async () => {
    try {
      const res = await fetch(`${baseUrl}/user/${userId}/cards`);
      const data = await res.json();
      if (data.status === "Success" && Array.isArray(data.cards)) {
        setCardDisplay(data.cards); 
        const balance = data.cards[0].balance;
       setUserBal(balance)
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  useEffect(() => {
    if (userId) displayCard();
  }, [userId]);

  const handleCardClick = (index) => {
    setFlippedCardIndex((prev) => (prev === index ? null : index));
  };

  return (
  <div className="w-full flex flex-col gap-5 lg:flex-row">
  <div className="custom-scroll overflow-x-auto whitespace-nowrap lg:w-1/2 w-full">
  <div className="flex gap-5 px-4 snap-x snap-mandatory">
    {cardDisplay.map((card, index) => {
      const fullName = card.cardName || "";
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      return (
        <div key={card.id || `${card.cardNumber}-${index}`} className="snap-start shrink-0">
          <CardStyle
            cardNumber={card.cardNumber}
            cardName={card.cardName}
            firstName={card.firstName}
            lastName={card.lastName}
            expiryDate="05/2030"
            isFlipped={flippedCardIndex === index}
            onClick={() => handleCardClick(index)}
          />
        </div>
      );
    })}

    {/* Add Card */}
    <div
      className="snap-start shrink-0 w-[240px] h-[150px] rounded-2xl border border-white/20 
      bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 
      bg-opacity-50 backdrop-blur-xl text-white/60 
      flex flex-col items-center justify-center cursor-pointer 
      transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:text-white"
    >
      <div className="text-5xl mb-2">+</div>
      <p className="text-sm uppercase tracking-wider">Add Card</p>
    </div>
  </div>
</div>


      <div className="lg:w-1/2 w-full px-4 lg:py-6 ml-[-10px] text-black">
  {/* Main container with vertical stack */}
  <div className="flex flex-col gap-4">

    {/* 1️⃣ Account Type */}
    <div className="flex justify-between px-2">
      <p className="font-medium">Account Type</p>
      <div className="">
        <p>Savings</p>
        </div>
    </div>
    

    {/* 2️⃣ Tier */}
    <div className="flex justify-between px-2">
      <span className="font-medium">Balance:</span>
      <span>₦{userBal}</span>
    </div>

    {/* 3️⃣ Minimum */}
    <div className="flex justify-between px-2">
      <span className="font-medium">Minimum:</span>
      <span>₦5,000</span>
    </div>

    {/* 4️⃣ Maximum */}
    <div className="flex justify-between px-2">
      <span className="font-medium">Maximum:</span>
      <span>₦1,000,000</span>
    </div>

  </div>
</div>

    </div>
  );
};

export default CreditCardDisplay;
