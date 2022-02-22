/**
 * CourseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - create
    create: async function (req, res) {
        var course = await Course.create(req.body).fetch();

        return res.status(201).json({ id: course.id });
    },
    
    json: async function (req, res) {
        var everycourses = await Course.find();
        return res.json(everycourses);
    },

    populate: async function (req, res) {

        var course = await Course.findOne(req.params.id).populate("student");

        if (!course) return res.notFound();

         return res.json(course);
        //return res.view("student/adminmanage", { student: course.student });
    },

    delete: async function (req, res) {

        var deletedCourse = await Course.destroyOne(req.params.id);

        if (!deletedCourse) return res.notFound();

        if (req.wantsJSON) {
            return res.status(201).json("Course deleted Successfully!");
        } else {
            return res.redirect('/');
        }
    },

     // action - read
     read: async function (req, res) {

        var thatCourse = await Course.findOne(req.params.id).populate("student");

        if (!thatCourse) return res.notFound();

       // return res.view('event/read', { event: thatCourse });

       return res.json([thatCourse]);
    },

    update: async function (req, res) {

        if (req.method == "GET") {
            var thatCourse = await Course.findOne(req.params.id);
            if (!thatCourse) return res.notFound();
            return res.json([thatCourse]);
        } else {
            var updateEvent = await Course.updateOne(req.params.id).set(req.body)
            if (!updateEvent) return res.notFound();
            return res.ok("Course updated");
        }
    },
  

};

