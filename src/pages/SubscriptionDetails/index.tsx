import { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { config } from "../../services/config";
import Cookies from 'js-cookie';

export default function SubscriptionDetails() {
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [userCountOAuthCheck, setUserCountOAuthCheck] = useState(false)
  const planId = localStorage.getItem("planId");
  useEffect(() => {
    const employeeCount = Cookies.get('employee_count');
    console.log(employeeCount)
    if (employeeCount) {
      setNumberOfEmployees(parseInt(employeeCount))
      setUserCountOAuthCheck(true)
    }
  }, [])
  const employeeCountOAuth = async () => {
    await axios.get(`${config.url.API_URL}/oauth/employee-count`, { withCredentials: true })
      .then(resp => {
        window.location.href = resp.data
      })
  }
  const estimateCost = (): string => {
    const num = numberOfEmployees || 0;
    switch (planId) {
      case "1":
        if (num <= 50) return "$29";
        return `$${(29 + (num - 50) * 1).toFixed(2)}`;
      case "2":
        if (num <= 200) return "$79";
        return `$${(79 + (num - 200) * 0.75).toFixed(2)}`;
      case "3":
        if (num <= 1000) return "$140";
        return `$${(140 + (num - 1000) * 0.5).toFixed(2)}`;
      default:
        return "$0.00";
    }
  };

  return (
    <>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h1>Great! You're nearly there</h1>
        <div style={{  margin: "0 auto", textAlign: "center" }}>
          <p>Please estimate how many users there are in your Microsoft 365 organization to determine monthly billing</p>
          <input
            disabled = {userCountOAuthCheck}
            style={{width: "30%", display: "block", margin: "0 auto"}}
            type="number"
            min={0}
            placeholder="Number of employees"
            value={numberOfEmployees}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setNumberOfEmployees(val === "" ? 0 : parseInt(val));
            }}
          />
          <small>
            (We’ll confirm this automatically later and adjust future billing accordingly)
          </small>
          <p>Or click here to find out exactly how many people are under your Microsoft 365 organization</p>
          <Button
            type="primary"
            size="large"
            style={{ width: "auto", marginBottom: "10px" }}
            onClick={async () => await employeeCountOAuth()}
          >
            Determine employee count
          </Button>
        </div>

        <p style={{ width: "60%", margin: "0 auto", textAlign: "center" }}>
          Estimated monthly cost: <strong>{estimateCost()}</strong>
        </p>
        <div style={{ height: "50px" }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "30%", marginBottom: "10px" }}
          >
            Continue to payment
          </Button>
        </div>
      </div>
    </>
  );
}
