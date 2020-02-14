const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher2', {useNewUrlParser: true, useUnifiedTopology: true}, () => {console.log(`Connected to the '${db.name}' DB on port ${db.port}`);});

const db = mongoose.connection;

const repoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  avatar: String,
  dateCreated: Date,
  dateUpdated: Date
})

const Repo = mongoose.model('Repo', repoSchema);

const save = function(repos) {
  repos.forEach((repo) => {
    let newRepo = {
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      avatar: repo.owner.avatar_url,
      dateCreated: repo.created_at,
      dateUpdated: repo.updated_at
    }
    console.log(newRepo);
    let newRepoDoc = new Repo(newRepo);
    newRepoDoc.save();
  })
}

const getAllRepos = function() {
  return Repo.find({});
}

module.exports = {
  save, getAllRepos
}
