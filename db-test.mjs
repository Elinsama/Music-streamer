import mongoose from 'mongoose';

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/my_database")
  
  console.log("Connected to Database");

  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const BlogPost = mongoose.model('BlogPost', new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date
  }));

  const post = new BlogPost();

  // create a comment
  post.title = 'new blog post';

  post.save((err) => {
    if (!err)
      console.log('Success!');
  });

  const instance = await BlogPost.findOne({ title: 'new blog post' });
  console.log(instance);

} catch (err) {
  console.log("Not Connected to Database ERROR! ", err);
}
