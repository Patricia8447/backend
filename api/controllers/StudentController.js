/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    add: async function (req, res) {

        if (!await Student.findOne(req.session.studentId)) return res.status(404).json("Student not found.");

        var thatCourse = await Course.findOne(req.params.fk).populate("student");
        
        if (!thatCourse) return res.status(404).json("Course not found.");

        return res.ok();
    },

    create: async function (req, res) {
        var student = await Student.create(req.body).fetch();

        return res.status(201).json({ id: student.id });
    },

    json: async function (req, res) {
        var everystudents = await Student.find();
        return res.json(everystudents);
    },

    populate: async function (req, res) {

        var student = await Student.find({ code: "C11111" });

        if (!student) return res.notFound();

        return res.json(student);
        //return res.view("course//myapplications", { course: student.course });
    },
    remove: async function (req, res) {

        if (!await Student.find({ id: "1" })) return res.status(404).json("Student not found.");

        //var thatCourse = await Course.findOne(req.params.fk).populate("student");
        var thatCourse = await Course.find(req.params.id).populate("student");

        if (!thatCourse) return res.status(404).json("Course not found.");

        // if (thatCourse.student.length == 0)
        //     return res.status(409).json("Nothing to delete.");    // conflict

        await Student.removeFromCollection("1", "course").members(req.params.id);

        return res.ok();
    },


};

