const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: {
        type: [authorSchema],
        required: true
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id')
        .select('name');
    console.log(courses);
}

async function updateAuthor(courseId) {
    const course = await Course.update({ _id: courseId }, {
        $unset: {
            'author': ''
        }
    });
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

removeAuthor('5e05abbef6c5a94d500a3664', '5e05abbef6c5a94d500a3663');

// addAuthor('5e05abbef6c5a94d500a3664', new Author({ name: 'Ken' }));

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('ExpressJS', [new Author({ name: 'Minh' }), new Author({ name: 'Rin' })]);

// listCourses();

// updateAuthor('5e05967c2690974227e5e51e');