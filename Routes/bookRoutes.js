const express = require("express");
const router = express.Router();
const Book = require("../Module/book");
router.post("/", async (req, res) => {
    try {
        const { title, author, category } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }
        const book = await Book.create({
            title, author,category
        });
        res.status(201).json({
            message: "Book added successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const books = await Book.find()
            .skip(skip)
            .limit(limit);
        const totalRecords = await Book.countDocuments();
        res.status(200).json({
            currentPage: page,
            totalRecords: totalRecords,
            books: books
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const { available } = req.body;

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { available: available },
            { new: true }
        );
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }
        res.status(200).json({
            message: "Availability updated successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;