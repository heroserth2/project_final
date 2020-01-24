var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database"
})

class ImageDAO {
    insertImage(image) {
        console.log(image)
        return new Promise((resolve, reject) => {
            var query = "INSERT INTO `image` SET ?"
                ,
                values = {
                    IMAGE_NAME: image.name,
                    IMAGE_TYPE: image.type,
                    IMAGE_DATA: image.data
                };
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err.code) 
                }
                return resolve(result)
            })
        })
    }
    getImageByPersonalId(id){
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM image WHERE IMAGE_NAME = '${id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                }
                if(result.length != 0 && result[0].IMAGE_DATA != null){
                    result[0].IMAGE_DATA = new Buffer.from(result[0].IMAGE_DATA, 'binary').toString('base64');
                }else {
                    result[0].IMAGE_DATA = null
                }
                return resolve(result)
            })
        })
    }
}

module.exports = ImageDAO