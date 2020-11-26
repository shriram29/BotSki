const fetch = require("node-fetch");

const fetchJokes = async () => {

    response = await fetch("https://api.reddit.com/r/dadjokes/top.json?sort=top&t=day&limit=1");
    response = await response.json();

    posts = response.data;
    
    var joke = {};
    joke['title'] = posts.children[0].data.title;
    joke['selftext'] = posts.children[0].data.selftext;

    return joke

}

module.exports = {
  fetchJokes 
};