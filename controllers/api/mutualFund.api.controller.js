const db = require('../../models');
const MutualFund = db.mutualfund;
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getAllMutualFund: async (req, res) => {
    try {
      const mutualfund = await MutualFund.findAll({});
      res.status(200).json({
        result: 'Success retrieving data',
        mutualfund: mutualfund,
      });
    } catch (error) {
      console.log(err);
    }
  },
  buying: async (req, res) => {
    const { transactionId, fundId, transactionType, typeOfPayment, units, amount, nav, fees, tax, totalAmount } =
      req.body;
    // const currentTime = new Date().getHours();
    const currentDate = new Date().toISOString();

    const currentTime = new Date().getHours();

    try {
      if (currentTime < 8 || currentTime > 15) {
        return res.status(400).json({ error: 'Transactions can only be made between 08:00 and 15:00.' });
      }
      if (typeOfPayment !== 1 && typeOfPayment !== 0) {
        return res.status(400).json({ error: 'There is no payment type for the transaction' });
      }
      // Create a new buying mutual fund
      const buyMutualFund = await MutualFund.create({
        transactionId: uuidv4(),
        fundId: uuidv4(),
        transactionType: transactionType,
        typeOfPayment: typeOfPayment ? 'QRcode' : 'Bank Transfer',
        DateTime: currentDate,
        units: units,
        amount: amount,
        nav: nav,
        fees: fees,
        tax: tax,
        totalAmount,
      });

      // Send a success response
      res.status(201).json({ msg: 'Buy Mutual Fund Berhasil' });
    } catch (error) {
      console.log(error);
      // Send an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  selling: async (req, res) => {
    const { transactionId, fundId, transactionType, typeOfPayment, units, amount, nav, fees, tax, totalAmount } =
      req.body;
    const currentDate = new Date().toISOString();

    const currentTime = new Date().getHours();
    try {
      if (currentTime < 8 || currentTime > 15) {
        return res.status(400).json({ error: 'Transactions can only be made between 08:00 and 15:00.' });
      }
      if (typeOfPayment !== 1 && typeOfPayment !== 0) {
        return res.status(400).json({ error: 'There is no payment type for the transaction' });
      }
      // Create a new selling mutual fund
      const sellMutualFund = await MutualFund.create({
        transactionId: uuidv4(),
        fundId: uuidv4(),
        transactionType: transactionType,
        typeOfPayment: typeOfPayment ? 'QRcode' : 'Bank Transfer',
        DateTime: currentDate,
        units: units,
        amount: amount,
        nav: nav,
        fees: fees,
        tax: tax,
        totalAmount,
      });

      // Send a success response
      res.status(201).json({ msg: 'Selling Mutual Fund Berhasil' });
    } catch (error) {
      console.log(error);
      // Send an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  switching: async (req, res) => {
    const { transactionId, fundId, transactionType, units, amount, nav, fees, tax, totalAmount } = req.body;
    const currentDate = new Date().toISOString();

    const currentTime = new Date().getHours();
    try {
      if (currentTime < 8 || currentTime > 15) {
        return res.status(400).json({ error: 'Transactions can only be made between 08:00 and 15:00.' });
      }
      // Create a new switching mutual fund
      const newMutualFund = await MutualFund.create({
        transactionId: uuidv4(),
        fundId: fundId,
        transactionType: transactionType,
        DateTime: currentDate,
        units: units,
        amount: amount,
        nav: nav,
        fees: fees,
        tax: tax,
        totalAmount,
      });

      // Send a success response
      res.status(201).json({ msg: 'Switching Mutual Fund Berhasil' });
    } catch (error) {
      console.log(error);
      // Send an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
