const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
});


// Model
const Student = mongoose.model("Student", studentSchema);



// ---------------- CREATE ----------------
app.post("/students", async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();

        res.json({
            message: "Student Added",
            student
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



// ---------------- READ ----------------
app.get("/students", async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



// ---------------- UPDATE ----------------
app.put("/students/:id", async (req, res) => {

    try {

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Student Updated",
            updatedStudent
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



// ---------------- DELETE ----------------
app.delete("/students/:id", async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student Deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});