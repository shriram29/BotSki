const fetch = require("node-fetch");
const fs = require('fs');

//Helper
const { getImageFromURL } = require('../source/helper/helper')

const fetchJokes = async () => {

    var response = await fetch("https://api.reddit.com/r/dadjokes/top.json?sort=top&t=day&limit=1");
    var response = await response.json();

    var posts = response.data;
    
    var joke = {};
    joke['title'] = posts.children[0].data.title;
    joke['selftext'] = posts.children[0].data.selftext;

    return joke

}

const fetchMemes = async (limit = 10) => {

  // create temp dir
  var temp = __dirname + '/temp';
  fs.mkdir(temp, {recursive : true}, () => {});

  var magic = {
    'ffd8ffe0' : '.jpg',
    '89504e47' : '.png',
    '47494638' : '.gif'
  };

  var response = await fetch('https://api.reddit.com/r/memes/top.json?sort=top&t=day&limit=1');
  var response = await response.json();
  var posts = response.data;


  var image = await getImageFromURL(posts.children[0].data.url);  
  var extension = magic[image.toString('hex',0, 4)];

  let path = `${temp}/${posts.children[0].data.title.replace(/\s+/g, '_').replace('/','_')}.${extension}`
  
  fs.writeFileSync(path , image, () => {});

  return path;
}

module.exports = {
  fetchJokes,
  fetchMemes
};