import Account from "../models/account.js";

const seedAccounts = async (branchId, branchName, isFirstBranch) => {
  try {
    const count = await Account.countDocuments({ branchId });

    if (count === 0) {
      console.log(`Seeding default accounts for branch: ${branchName}...`);

      // إنشاء الحسابات الرئيسية
      const assets = await Account.create({ name: `Assets - ${branchName}`,  accountType: "asset", parent: null, branchId });
      const liabilities = await Account.create({ name: `Liabilities - ${branchName}`, accountType: "liability", parent: null, branchId });
      const equity = await Account.create({ name: `Equity - ${branchName}`,accountType: "equity", parent: null, branchId });
      const revenue = await Account.create({ name: `Revenue - ${branchName}`, accountType: "revenue", parent: null, branchId });
      const expenses = await Account.create({ name: `Expenses - ${branchName}`, accountType: "expense", parent: null, branchId });

      // إضافة الحسابات الفرعية تحت الحسابات الرئيسية
      const accounts = [
        { name: `Cash - ${branchName}`, accountType: "asset", parent: assets._id, branchId },
        { name: `Bank - ${branchName}`,  accountType: "asset", parent: assets._id, branchId },
        { name: `Accounts Receivable - ${branchName}`,  accountType: "asset", parent: assets._id, branchId },

        { name: `Accounts Payable - ${branchName}`,  accountType: "liability", parent: liabilities._id, branchId },
        { name: `Loans - ${branchName}`, accountType: "liability", parent: liabilities._id, branchId },

        { name: `Transfer Fees - ${branchName}`,  accountType: "revenue", parent: revenue._id, branchId },

        { name: `Salaries - ${branchName}`,  accountType: "expense", parent: expenses._id, branchId },
        { name: `Rent - ${branchName}`,  accountType: "expense", parent: expenses._id, branchId },
        { name: `Utilities - ${branchName}`, accountType: "expense", parent: expenses._id, branchId }
      ];

      if (isFirstBranch) {
        accounts.push({ name: `Capital - ${branchName}`, accountType: "equity", parent: equity._id, branchId });
      }

      await Account.create(accounts);
      console.log("Default accounts seeded successfully.");
    } else {
      console.log("Accounts already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding accounts:", error);
  }
};


export default seedAccounts;
