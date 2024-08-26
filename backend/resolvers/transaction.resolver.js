import Transaction from '../models/transaction.model.js';
import User from '../models/user.model.js';

const ensureAuthenticated = (resolver) => {
  return async (parent, args, context, info) => {
    if (context.isUnauthenticated()) {
      throw new Error('Unauthorized');
    }
    try {
      return await resolver(parent, args, context, info);
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

const transactionResolver = {
  Query: {
    transactions: ensureAuthenticated(async (_, __, context) => {
      const userId = context.getUser()._id;
      return await Transaction.find({ userId }).select('-__v');
    }),
    transaction: ensureAuthenticated(async (_, { transactionId }) => {
      const transaction = await Transaction.findById(transactionId).select(
        '-__v'
      );
      if (!transaction) throw new Error('Transaction not found');
      return transaction;
    }),
    categoryStatistics: ensureAuthenticated(async (_, __, context) => {
      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId })
        .select('category amount')
        .lean();

      const categoryMap = transactions.reduce((acc, { category, amount }) => {
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    }),
  },
  Mutation: {
    createTransaction: ensureAuthenticated(async (_, { input }, context) => {
      const newTransaction = new Transaction({
        ...input,
        userId: context.getUser()._id,
      });
      return await newTransaction.save();
    }),
    updateTransaction: ensureAuthenticated(async (_, { input }) => {
      const { transactionId, ...updateFields } = input;
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        updateFields,
        {
          new: true,
        }
      ).select('-__v');
      if (!updatedTransaction) throw new Error('Transaction not found');
      return updatedTransaction;
    }),
    deleteTransaction: ensureAuthenticated(async (_, { transactionId }) => {
      const deletedTransaction = await Transaction.findByIdAndDelete(
        transactionId
      ).select('-__v');
      if (!deletedTransaction) throw new Error('Transaction not found');
      return deletedTransaction;
    }),
  },
  Transaction: {
    user: ensureAuthenticated(async (parent) => {
      const user = await User.findById(parent.userId).select('-__v');
      if (!user) throw new Error('User not found');
      return user;
    }),
  },
};

export default transactionResolver;
