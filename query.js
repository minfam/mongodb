const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/playground")
    .then(() => console.log('Connecting to mongoDB...'))
    .catch(err => console.error('Could not connect to mongoDB...'))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Minh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

// async function getCourses() {
//     const courses = await Course
//         .find({ author: 'Minh', isPublished: true })
//         .limit(10)
//         .sort('-name')
//         .select('name tags');
//     console.log(courses);
// }

// async function getCourses() {
//     //eq (equal)
//     //ne (not equal)
//     //gt (greater than)
//     //gte (greater than or equal to)
//     //lt (less than)
//     //lte (less than or equal to)
//     //in 
//     //nin (not in)
//     const courses = await Course
//         // .find({ price : { $gte: 10, $lte: 20 }})
//         // .find({ price: { $in: [10, 15, 20] } })
//         .limit(10)
//         .sort('-name')
//         .select('name tags');
//     console.log(courses);
// }

// async function getCourses() {
//     //or
//     //and

//     const courses = await Course
//         .find()
//         .or([{ author: 'Minh' }, { isPublished: true }])
//         .and([])
//         .limit(10)
//         .sort('-name')
//         .select('name tags');
//     console.log(courses);
// }

// async function getCourses() {
//     const courses = await Course
//     // Starts with Minh
//     // .find({ author: /^Minh/ })

//     // Ends with Pham
//     // .find({ author: /Pham$/ })

//     // Contains Minh
//     // .find({ author: /.*Minh.*/ })
//     .limit(10)
//         .sort('-name')
//         .select('name tags');
//     console.log(courses);
// }

// async function getCourses() {
//     const courses = await Course
//         .find({ author: 'Minh', isPublished: true })
//         .limit(10)
//         .sort('-name')
//         .count();
//     console.log(courses);
// }

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Minh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort('-name')
        .select('name tags');
    console.log(courses);
}

// createCourse();
getCourses();