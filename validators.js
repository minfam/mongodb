const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/playground")
    .then(() => console.log('Connecting to mongoDB...'))
    .catch(err => console.error('Could not connect to mongoDB...'))

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: trueue,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: (v) => Promise.resolve(v && v.length),
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Minh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.7
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

async function getCourses() {
    // const pageNumber = 2;
    // const pageSize = 10;

    const courses = await Course
        .find({ _id: '5e047d97146ad404caa2e4f1' })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1 });
    console.log(courses[0].price);
}


// createCourse();
getCourses();