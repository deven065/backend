const express = require("express")
const { authMiddleware }  = require("../middleware")
const { Account } = require("../db")
const mongoose = require("mongoose")

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId : req.userId
    });

    res.json({
        balance : account.balance
    })
});

// Transfer endpoint
router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId });

    if (!account || account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to })

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    // Commit the transaction
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;