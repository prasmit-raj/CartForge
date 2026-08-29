/**
 * Get seller inventory data (Protected - Seller only)
 */
export const getSellerInventory = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Seller inventory retrieved successfully",
      seller: req.user.email,
      data: [
        {
          id: "prod-1",
          title: "Wireless Noise-Canceling Headphones",
          category: "Electronics",
          price: 199.99,
          stock: 45,
          status: "Active",
        },
        {
          id: "prod-4",
          title: "Mechanical RGB Gaming Keyboard",
          category: "Electronics",
          price: 119.99,
          stock: 28,
          status: "Active",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch seller inventory",
      error: error.message,
    });
  }
};

/**
 * Get seller analytics data (Protected - Seller only)
 */
export const getSellerAnalytics = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Seller analytics retrieved successfully",
      seller: req.user.email,
      analytics: {
        totalRevenue: 24850.0,
        totalOrders: 184,
        activeListings: 12,
        monthlyGrowth: "+18.4%",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch seller analytics",
      error: error.message,
    });
  }
};
