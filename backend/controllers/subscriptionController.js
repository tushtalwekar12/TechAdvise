import Subscription from '../models/Subscription.js';

// POST /api/subscribe
export const createSubscription = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Check if email already subscribed
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }

    const subscription = await Subscription.create({ email });
    res.status(201).json({ success: true, data: subscription, message: 'Subscribed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/subscribe (admin route to get all subscriptions)
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ subscribedAt: -1 });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
