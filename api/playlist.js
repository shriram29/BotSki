const fetch = require('node-fetch');

module.exports = async (port, id) => { 

    let res = await fetch(`http://localhost:${port}/playlist?id=${id}`);
    res =  await res.json();
    
    return res;
}

