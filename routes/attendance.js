// routes/attendance.js
const express = require('express');
const router = express.Router();
const db = require('../models'); // Import your database models

// Endpoint to handle attendance data
router.post('/', async (req, res) => {
    console.log(req.body);  // Check if the body is received properly
    const { courseID, studentIDs } = req.body;

    if (!courseID || !Array.isArray(studentIDs) || studentIDs.length === 0) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    try {
        // Fetch student details based on student IDs
        const students = await db.Student.findAll({
            where: {
                roll: studentIDs // Assuming 'id' is the field used for student roll number
            }
        });

        // Check if any students were found
        if (students.length === 0) {
            return res.status(404).json({ error: 'No students found for the given IDs' });
        }

        // Loop through student details and update attendance
        for (const student of students) {
            await db.Attendance.create({
                course: courseID,
                roll: student.roll, // Assuming 'id' is the roll number
                name: student.name, // Include name from student details
                date: new Date(),
                year: student.year, // Assuming 'year' is a field in your Student model
                status: "Present",
            });
        }

        res.status(200).json({ message: 'Attendance recorded successfully' });
    } catch (error) {
        console.error('Error recording attendance:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
