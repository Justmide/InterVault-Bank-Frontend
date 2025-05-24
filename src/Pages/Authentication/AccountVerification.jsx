import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const AccountVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const [verification, setVerification] = useState(null);

  useEffect(() => {
    const handleVerifyAcc = async () => {
      setVerifying(true);
      try {
        const res = await fetch(`http://localhost:3001/api/v1/auth/verify/${token}`, {
          method: "POST",
        });
        const data = await res.json();
        setVerification(data);

        // Redirect after 3 seconds if success
        if (data.status === "success") {
          setTimeout(() => {
            navigate("/login"); // Change this route if needed
          }, 3000);
        }
      } catch (error) {
        console.error(error);
        setVerification({ message: "Something went wrong.", status: "error" });
      } finally {
        setVerifying(false);
      }
    };

    if (token) handleVerifyAcc();
  }, [token, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "#fff",
          padding: "40px 30px",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <img
          src="https://ucarecdn.com/f82a4e83-f177-4aed-9ac0-94c9657078c1/Intervaultremovebgpreview.png"
          alt="InterVault Logo"
          style={{ maxWidth: "150px", marginBottom: "20px" }}
        />

        {verifying ? (
          <>
            <div className="loader" />
            <p style={{ marginTop: "20px", fontWeight: "bold" }}>Verifying your account...</p>
          </>
        ) : verification ? (
          <>
            <p
              style={{
                fontSize: "16px",
                color: verification.status === "success" ? "#2e7d32" : "#c62828",
                fontWeight: "bold",
              }}
            >
              {verification.message}
            </p>
            {verification.status === "success" && (
              <p style={{ fontSize: "14px", marginTop: "10px", color: "#555" }}>
                Redirecting to login page... <Link to="login">Login</Link>
               
              </p>
            )}
          </>
        ) : null}
      </div>

      {/* Spinner style */}
      <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #c62828;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: auto;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AccountVerification;
