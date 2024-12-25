const getDashboardUrlByRole = (role) => {
  switch (role) {
    case "owner":
      return "owner-dashboard";
    case "admin":
      return "admon-owner";
    case "driver":
      return "driver-dashboard";
    default:
      return "customer-dashboard";
  }
};

module.exports = getDashboardUrlByRole;