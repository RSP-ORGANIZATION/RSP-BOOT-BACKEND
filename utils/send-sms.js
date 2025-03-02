import axios from "axios";
import "dotenv/config";

export const sendSMS = async (phoneNumber, otp) => {
  const apiKey = process.env.SMS_API_KEY;
  const message = `From The Recipe Haven, OTP: ${otp}`;
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: message,
        language: "english",
        flash: 0,
        numbers: phoneNumber,
      },
      {
        headers: {
          authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS Sent Successfully:", response.data);
  } catch (error) {
    console.error("Error Sending SMS:", error.response?.data || error.message);
  }
};

// Example Usage
/* sendSMS("8329994136", "123456"); */
