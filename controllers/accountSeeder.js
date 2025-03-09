import Account from "../models/account.js";

const seedAccounts = async (branchId) => {
  try {
    const count = await Account.countDocuments({ branchId: branchId });

    if (count > 0|| count===0) {
        console.log("Seeding default accounts...");
    await Account.create({ name: "Assets", code: "1", accountType: "asset", parent: null, branchId: branchId });
    await Account.create({ name: "Liabilities", code: "2", accountType: "liability", parent: null, branchId: branchId });
    await Account.create({ name: "Equity", code: "3", accountType: "equity", parent: null, branchId: branchId });
    await Account.create({ name: "Revenue", code: "4", accountType: "revenue", parent: null, branchId: branchId });
    await Account.create({ name: "Expenses", code: "5", accountType: "expense", parent: null, branchId: branchId });

    console.log("Default accounts seeded successfully.");
     
    }
    console.log("Accounts already exist, skipping seeding.");
    return;
  } catch (error) {
    console.error("Error seeding accounts:", error);
  }
};

export default seedAccounts;
