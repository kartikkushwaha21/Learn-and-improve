const Razorpay = require("razorpay")

const keyId = process.env.RAZORPAY_KEY
const keySecret = process.env.RAZORPAY_SECRET

const isPlaceholderValue = (value = "") =>
  !value || value.startsWith("your-razorpay-")

const isConfigured =
  !isPlaceholderValue(keyId) && !isPlaceholderValue(keySecret)

exports.instance = isConfigured
  ? new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })
  : null

exports.getRazorpayKeyId = () => (isConfigured ? keyId : null)

exports.getRazorpayConfigError = () => {
  if (isConfigured) {
    return null
  }

  return "Razorpay is not configured. Set valid RAZORPAY_KEY and RAZORPAY_SECRET in the backend environment."
}
