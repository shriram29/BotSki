const fetch = require('node-fetch');

module.exports = async () => { 

    let res = await fetch('https://api.covid19india.org/data.json')
    res =  await res.json();
    return res['statewise'][0];
}
