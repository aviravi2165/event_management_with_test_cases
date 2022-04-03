const isJSON = (str)=>{
    try {
        const check = JSON.parse(str);
        return true;
    } catch (e) {
        return  false;
    }
}



module.exports = {
    isJSON
}