var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
//con.timeout = 0;
class RequestDAO {
    getMaxId(type, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(REQUEST_NO) As 'maxId' FROM request WHERE REQUEST_NO LIKE '%${type}%' AND REQUEST_YEAR ='${year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                return resolve(result)
            })
        })
    }
    insert(request) {
        request.status = 'wait'
        request.status_before = 'wait'
        request.is_deleted = 'N'
        console.log(request.date_issued)
        return new Promise((resolve, reject) => {
            let column = `REQUEST_NO, REQUEST_YEAR, PERSONAL_ID_OWNER, REQUEST_TYPE_ID, STAFF_ID_ALDERMAN, ESTABLISHMENT_ID, `
            column = column + `STAFF_ID_MONEY, REFERENCE_ID, TRAIN_ID, PERSONAL_ID_ASSISTANT, STAFF_ID_APPROVE, ESTABLISHMENT_IS_LAND_OWNED,ESTABLISHMENT_ADDRESS_ID , REQUEST_MENU, `
            column = column + `REQUEST_DATE_SUBMISSION, REQUEST_DATE_APPROVE, REQUEST_DOC_NO1, REQUEST_DOC_NO2, REQUEST_DOC_NO3, `
            column = column + `REQUEST_DOC_NO4, REQUEST_DOC_NO5, REQUEST_DOC_NO6, REQUEST_SUBCATEGORY, REQUEST_PRODUCT_TYPE,`
            column = column + `REQUEST_SELL_START, REQUEST_SELL_END, REQUEST_SELL_ALLOW, `
            column = column + `REQUEST_DATE_ISSUED, REQUEST_DATE_EXPIRED, `
            column = column + `REQUEST_CONDITION_NO_1, REQUEST_CONDITION_NO_2, REQUEST_CONDITION_NO_3, REQUEST_CONDITION_NO_4, `
            column = column + `REQUEST_IMAGE_NAME, REQUEST_TOTAL_IMAGE, REQUEST_STATUS, REQUEST_DELETE_LOGIC, REQUEST_IS_DELETED, `
            column = column + `REQUEST_LAST_UPDATE, REQUEST_USER_UPDATE ,REQUEST_STATUS_BEFORE` //${request.establishment_is_land_owned}

            let values = `'${request.no}','${request.year}', '${request.personal_id_owner}', '${request.request_type_id}', '${request.staff_id_alderman}', `
            values = values + `'${request.establishment_id}', ${request.staff_id_money}, ${request.reference_id}, ${request.train_id}, `
            values = values + `${request.personal_id_assistant}, ${request.staff_id_approve}, ${request.establishment_is_land_owned},${request.establishment_address_id}, '${request.menu}', '${request.date_submission}', `
            values = values + `${request.date_approve}, '${request.doc_no1}', '${request.doc_no2}', '${request.doc_no3}', `
            values = values + `'${request.doc_no4}', '${request.doc_no5}', '${request.doc_no6}', ${request.subcategory}, `
            values = values + `${request.product_type}, ${request.sell_start}, ${request.sell_end}, '${request.sell_allow}', `
            values = values + `${request.date_issued}, ${request.date_expired}, ${request.condition_no_1}, `
            values = values + `${request.condition_no_2}, ${request.condition_no_3}, ${request.condition_no_4}, ${request.image_name}, `
            values = values + `'${request.total_image}', '${request.status}', ${request.delete_logic}, '${request.is_deleted}', `
            values = values + `'${request.last_update}', '${request.user_update}', '${request.status_before}' `
            let query = `INSERT INTO request(${column}) VALUES (${values})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    insertRenew(request) {
        request.status = 'active'
        request.status_before = 'active'
        request.is_deleted = 'N'
        console.log('--- DATABASE INSERT RENEW --- ')
        console.log(request)
        console.log('--- END DATABASE INSERT RENEW ---')
        return new Promise((resolve, reject) => {
            let column = `REQUEST_NO, REQUEST_YEAR, PERSONAL_ID_OWNER, REQUEST_TYPE_ID, STAFF_ID_ALDERMAN, ESTABLISHMENT_ID, `
            column = column + `STAFF_ID_MONEY, REFERENCE_ID, TRAIN_ID, PERSONAL_ID_ASSISTANT, STAFF_ID_APPROVE, ESTABLISHMENT_IS_LAND_OWNED,ESTABLISHMENT_ADDRESS_ID , REQUEST_MENU, `
            column = column + `REQUEST_DATE_SUBMISSION, REQUEST_DATE_APPROVE, REQUEST_DOC_NO1, REQUEST_DOC_NO2, REQUEST_DOC_NO3, `
            column = column + `REQUEST_DOC_NO4, REQUEST_DOC_NO5, REQUEST_DOC_NO6, REQUEST_SUBCATEGORY, REQUEST_PRODUCT_TYPE,`
            column = column + `REQUEST_SELL_START, REQUEST_SELL_END, REQUEST_SELL_ALLOW, `
            column = column + `REQUEST_DATE_ISSUED, REQUEST_DATE_EXPIRED, `
            column = column + `REQUEST_CONDITION_NO_1, REQUEST_CONDITION_NO_2, REQUEST_CONDITION_NO_3, REQUEST_CONDITION_NO_4, `
            column = column + `REQUEST_IMAGE_NAME, REQUEST_TOTAL_IMAGE, REQUEST_STATUS, REQUEST_DELETE_LOGIC, REQUEST_IS_DELETED, `
            column = column + `REQUEST_LAST_UPDATE, REQUEST_USER_UPDATE ,REQUEST_STATUS_BEFORE,` //${request.establishment_is_land_owned}
            column = column + `REQUEST_RECEIPT_FINE, REQUEST_RECEIPT_FEE, REQUEST_RECEIPT_DATE`
            let values = `'${request.no}','${request.year}', '${request.personal_id_owner}', '${request.request_type_id}', '${request.staff_id_alderman}', `
            values = values + `'${request.establishment_id}', ${request.staff_id_money}, ${request.reference_id}, ${request.train_id}, `
            values = values + `${request.personal_id_assistant}, ${request.staff_id_approve}, ${request.establishment_is_land_owned},${request.establishment_address_id}, '${request.menu}', '${request.date_submission}', `
            values = values + `${request.date_approve}, '${request.doc_no1}', '${request.doc_no2}', '${request.doc_no3}', `
            values = values + `'${request.doc_no4}', '${request.doc_no5}', '${request.doc_no6}', ${request.subcategory}, `
            values = values + `${request.product_type}, ${request.sell_start}, ${request.sell_end}, '${request.sell_allow}', `
            values = values + `${request.date_issued}, ${request.date_expired}, ${request.condition_no_1}, `
            values = values + `${request.condition_no_2}, ${request.condition_no_3}, ${request.condition_no_4}, ${request.image_name}, `
            values = values + `'${request.total_image}', '${request.status}', NULL, '${request.is_deleted}', `
            values = values + `'${request.last_update}', '${request.user_update}', '${request.status_before}' ,`
            values = values + `${request.receipt_fine}, ${request.receipt_fee}, ${request.receipt_date}`

            let query = `INSERT INTO request(${column}) VALUES (${values})`
            console.log(query)
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    insertDuplication(request) {
        console.log(request.date_issued)
        return new Promise((resolve, reject) => {
            let column = ''
            column = column + `REQUEST_NO, REQUEST_YEAR, PERSONAL_ID_OWNER, REQUEST_TYPE_ID,`
            column = column + `STAFF_ID_ALDERMAN, ESTABLISHMENT_ID,STAFF_ID_MONEY, REFERENCE_ID,`
            column = column + `TRAIN_ID, PERSONAL_ID_ASSISTANT,STAFF_ID_APPROVE, ESTABLISHMENT_ADDRESS_ID,`
            column = column + `ESTABLISHMENT_IS_LAND_OWNED, REQUEST_MENU,REQUEST_DATE_SUBMISSION, REQUEST_DATE_APPROVE,`
            column = column + `REQUEST_DOC_NO1, REQUEST_DOC_NO2,REQUEST_DOC_NO3, REQUEST_DOC_NO4,`
            column = column + `REQUEST_DOC_NO5, REQUEST_DOC_NO6,REQUEST_SUBCATEGORY, REQUEST_PRODUCT_TYPE,`
            column = column + `REQUEST_SELL_START , REQUEST_SELL_END, REQUEST_SELL_ALLOW,`
            column = column + `REQUEST_RECEIPT_FINE,REQUEST_RECEIPT_FEE, REQUEST_RECEIPT_TOTAL,`
            column = column + `REQUEST_RECEIPT_DATE,`
            column = column + `REQUEST_RECEIPT_FINE_YEAR_2, REQUEST_RECEIPT_FEE_YEAR_2, REQUEST_RECEIPT_TOTAL_YEAR_2,`
            column = column + `REQUEST_RECEIPT_DATE_YEAR_2,`
            column = column + `REQUEST_RECEIPT_FINE_YEAR_3, REQUEST_RECEIPT_FEE_YEAR_3, REQUEST_RECEIPT_TOTAL_YEAR_3,`
            column = column + `REQUEST_RECEIPT_DATE_YEAR_3, REQUEST_DATE_ISSUED, REQUEST_DATE_EXPIRED,`
            column = column + `REQUEST_CONDITION_NO_1,  REQUEST_CONDITION_NO_2,  REQUEST_CONDITION_NO_3,`
            column = column + `REQUEST_CONDITION_NO_4, REQUEST_IMAGE_NAME, REQUEST_TOTAL_IMAGE,`
            column = column + `REQUEST_STATUS, REQUEST_DELETE_LOGIC, REQUEST_IS_DELETED, REQUEST_STATUS_BEFORE,`
            column = column + `REQUEST_LAST_UPDATE, REQUEST_USER_UPDATE , REQUEST_RECEIPT_FINE_TRANSFER ,REQUEST_RECEIPT_DATE_TRANSFER`

            let values = ``
            values = values + `'${request.REQUEST_NO}',`
            values = values + `'${request.REQUEST_YEAR}',`
            values = values + `'${request.PERSONAL_ID_OWNER}',`
            values = values + `'${request.REQUEST_TYPE_ID}',`
            values = values + `'${request.STAFF_ID_ALDERMAN}',`
            values = values + `'${request.ESTABLISHMENT_ID}',`
            values = values + `${request.STAFF_ID_MONEY},`
            values = values + `${request.REFERENCE_ID},`
            values = values + `${request.TRAIN_ID},`
            values = values + `${request.PERSONAL_ID_ASSISTANT},`
            values = values + `${request.STAFF_ID_APPROVE},`
            values = values + `${request.ESTABLISHMENT_ADDRESS_ID},`
            values = values + `${request.ESTABLISHMENT_IS_LAND_OWNED},`
            values = values + `'${request.REQUEST_MENU}',`
            values = values + `'${request.REQUEST_DATE_SUBMISSION}',`
            values = values + `${request.REQUEST_DATE_APPROVE},`
            values = values + `'${request.REQUEST_DOC_NO1}',`
            values = values + `'${request.REQUEST_DOC_NO2}',`
            values = values + `'${request.REQUEST_DOC_NO3}',`
            values = values + `'${request.REQUEST_DOC_NO4}',`
            values = values + `'${request.REQUEST_DOC_NO5}',`
            values = values + `'${request.REQUEST_DOC_NO6}',`
            values = values + `${request.REQUEST_SUBCATEGORY},`
            values = values + `${request.REQUEST_PRODUCT_TYPE},`
            values = values + `${request.REQUEST_SELL_START},`
            values = values + `${request.REQUEST_SELL_END},`
            values = values + `'${request.REQUEST_SELL_ALLOW}',`
            values = values + `${request.REQUEST_RECEIPT_FINE},`
            values = values + `${request.REQUEST_RECEIPT_FEE},`
            values = values + `${request.REQUEST_RECEIPT_TOTAL},`
            values = values + `${request.REQUEST_RECEIPT_DATE},`
            values = values + `${request.REQUEST_RECEIPT_FINE_YEAR_2},`
            values = values + `${request.REQUEST_RECEIPT_FEE_YEAR_2},`
            values = values + `${request.REQUEST_RECEIPT_TOTAL_YEAR_2},`
            values = values + `${request.REQUEST_RECEIPT_DATE_YEAR_2},`
            values = values + `${request.REQUEST_RECEIPT_FINE_YEAR_3},`
            values = values + `${request.REQUEST_RECEIPT_FEE_YEAR_3},`
            values = values + `${request.REQUEST_RECEIPT_TOTAL_YEAR_3},`
            values = values + `${request.REQUEST_RECEIPT_DATE_YEAR_3},`
            values = values + `${request.REQUEST_DATE_ISSUED},`
            values = values + `${request.REQUEST_DATE_EXPIRED},`
            values = values + `${request.REQUEST_CONDITION_NO_1},`
            values = values + `${request.REQUEST_CONDITION_NO_2},`
            values = values + `${request.REQUEST_CONDITION_NO_3},`
            values = values + `${request.REQUEST_CONDITION_NO_4},`
            values = values + `'${request.REQUEST_IMAGE_NAME}',`
            values = values + `'${request.REQUEST_TOTAL_IMAGE}',`
            values = values + `'${request.REQUEST_STATUS}',`
            values = values + `${request.REQUEST_DELETE_LOGIC},`
            values = values + `'${request.REQUEST_IS_DELETED}',`
            values = values + `'${request.REQUEST_STATUS_BEFORE}',`
            values = values + `'${request.REQUEST_LAST_UPDATE}',`
            values = values + `'${request.REQUEST_USER_UPDATE}',`
            values = values + `${request.REQUEST_RECEIPT_FINE_TRANSFER},`
            values = values + `'${request.REQUEST_RECEIPT_DATE_TRANSFER}'`
            console.log(values)
            let query = `INSERT INTO request(${column}) VALUES (${values})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    getRequestById(id, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM request WHERE REQUEST_NO='${id}' AND REQUEST_YEAR='${year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result[0])
            })
        })
    }
    getCountRequestExp30Day() {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(REQUEST_NO) As RE_EXP FROM request WHERE DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) <= 30 AND REQUEST_STATUS = 'active'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result[0])
            })
        })
    }
    getCountRequestExpTable(status, more) {
        return new Promise((resolve, reject) => {
            let column = `request.REQUEST_NO As R_NO, `
            column = column + `request.REQUEST_YEAR As R_YEAR, `
            column = column + `request.REQUEST_MENU, `
            column = column + `request_type.REQUEST_TYPE_NAME, `
            column = column + `personal.PERSONAL_TITLE, `
            column = column + `personal.PERSONAL_NAME, `
            column = column + `personal.PERSONAL_SURNAME, `
            column = column + `request.REQUEST_DATE_ISSUED As DATE_ISSUED, `
            column = column + `DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) As COUNT_DATE_EXPIRE, `

            column = column + `request.REQUEST_DATE_EXPIRED As DATE_EXP `

            let joinTable = `JOIN request_type ON request_type.REQUEST_TYPE_ID = request.REQUEST_TYPE_ID `
            joinTable = joinTable + `JOIN personal ON personal.PERSONAL_ID = request.PERSONAL_ID_OWNER `
            let conditiion = ``
            if (status === 30) {
                conditiion = `DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) <= ${status}`
            }
            if (status === 90) {
                conditiion = `DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) <= ${status} AND DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) > 30`
            }
            if (more === true) {
                conditiion = `DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) > 90`
            }
            console.log()
            let query = `SELECT ${column} FROM request ${joinTable} WHERE ${conditiion} AND REQUEST_STATUS = 'active'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestByReNew(type, personal_id) {
        return new Promise((resolve, reject) => {
            let joinTable = `JOIN establishment ON request.ESTABLISHMENT_ID = establishment.ESTABLISHMENT_ID `
            joinTable = joinTable + `JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID `
            joinTable = joinTable + `JOIN address ON address.ADDRESS_ID = establishment.ADDRESS_ID `
            let query = `SELECT * FROM request ${joinTable} WHERE request.PERSONAL_ID_OWNER='${personal_id}' AND request.REQUEST_MENU='${type}' AND request.REQUEST_STATUS = 'active' AND request.REQUEST_IS_DELETED = 'N' AND DATEDIFF(request.REQUEST_DATE_EXPIRED,NOW()) <=90`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestAndPersonal(r_no, r_year) {
        return new Promise((resolve, reject) => {
            let joinTable = `JOIN personal ON personal.PERSONAL_ID = request.PERSONAL_ID_OWNER `
            joinTable = joinTable + `JOIN address ON personal.ADDRESS_ID = address.ADDRESS_ID `
            joinTable = joinTable + `JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID `
            let condition = `REQUEST_NO = '${r_no}' AND REQUEST_YEAR = '${r_year}' AND `
            condition = condition + `REQUEST_STATUS = 'active' `
            condition = condition + `AND (request.REQUEST_MENU = 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร' `
            condition = condition + `OR request.REQUEST_MENU = 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร')`
            let query = `SELECT * FROM request ${joinTable} WHERE ${condition}`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestTransfer(personal_id) {
        return new Promise((resolve, reject) => {
            let joinTable = `JOIN establishment ON request.ESTABLISHMENT_ID = establishment.ESTABLISHMENT_ID `
            joinTable = joinTable + `JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID `
            joinTable = joinTable + `JOIN address ON address.ADDRESS_ID = establishment.ADDRESS_ID `
            let query = `SELECT * FROM request ${joinTable} WHERE request.PERSONAL_ID_OWNER='${personal_id}' `
            query = query + `AND request.REQUEST_STATUS = 'active' AND request.REQUEST_IS_DELETED = 'N' `
            query = query + `AND (request.REQUEST_MENU = 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร' `
            query = query + `OR request.REQUEST_MENU = 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร')`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestByReNewByRequestId(no, year) {
        return new Promise((resolve, reject) => {
            let joinTable = `JOIN establishment ON request.ESTABLISHMENT_ID = establishment.ESTABLISHMENT_ID `
            joinTable = joinTable + `JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID `
            joinTable = joinTable + `JOIN address ON address.ADDRESS_ID = establishment.ADDRESS_ID `
            let query = `SELECT *,establishment.ESTABLISHMENT_IS_LAND_OWNED As E_DATA_LAND,establishment.ADDRESS_ID As E_DATA_ADDRESS FROM request ${joinTable} WHERE request.REQUEST_NO='${no}' AND request.REQUEST_YEAR='${year}' AND DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) <= 90`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestByTpyeAndOwnerId(type, Owner) {
        return new Promise((resolve, reject) => {
            let query = `SELECT *,DATEDIFF(REQUEST_DATE_EXPIRED, NOW()) As  COUNT_DATE_EXPIRE FROM request JOIN establishment ON request.ESTABLISHMENT_ID = establishment.ESTABLISHMENT_ID WHERE REQUEST_STATUS='${type}' AND PERSONAL_ID_OWNER='${Owner}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestByTpyeAndOwnerIdAssistant(type, Owner) {
        return new Promise((resolve, reject) => {
            let query = `SELECT *,DATEDIFF(REQUEST_DATE_EXPIRED, NOW()) As  COUNT_DATE_EXPIRE FROM request JOIN personal ON request.PERSONAL_ID_OWNER = personal.PERSONAL_ID WHERE REQUEST_STATUS='${type}' AND PERSONAL_ID_ASSISTANT='${Owner}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    //UPDATE personal SET ${value} WHERE PERSONAL_ID='${personal.id}'\
    update(request) {
        console.log(`-------- DATABASE -------`)
        console.log(request)
        console.log(`-------- DATABASE -------`)
        return new Promise((resolve, reject) => {
            let column = `PERSONAL_ID_OWNER='${request.personal_id_owner}', REQUEST_TYPE_ID='${request.request_type_id}', STAFF_ID_ALDERMAN='${request.staff_id_alderman}', ESTABLISHMENT_ID='${request.establishment_id}', `
            column = column + `STAFF_ID_MONEY=${request.staff_id_money}, REFERENCE_ID=${request.reference_id}, TRAIN_ID=${request.train_id}, PERSONAL_ID_ASSISTANT=${request.personal_id_assistant}, STAFF_ID_APPROVE=${request.staff_id_approve}, REQUEST_MENU='${request.menu}', `
            column = column + `REQUEST_DATE_SUBMISSION='${request.date_submission}', REQUEST_DATE_APPROVE=${request.date_approve}, REQUEST_DOC_NO1='${request.doc_no1}', REQUEST_DOC_NO2='${request.doc_no2}', REQUEST_DOC_NO3='${request.doc_no3}', `
            column = column + `REQUEST_DOC_NO4='${request.doc_no4}', REQUEST_DOC_NO5='${request.doc_no5}', REQUEST_DOC_NO6='${request.doc_no6}', REQUEST_SUBCATEGORY=${request.subcategory}, REQUEST_PRODUCT_TYPE=${request.product_type},`
            column = column + `REQUEST_SELL_START=${request.sell_start}, REQUEST_SELL_END=${request.sell_end}, REQUEST_SELL_ALLOW='${request.sell_allow}', REQUEST_RECEIPT_FINE=${request.receipt_fine}, `
            column = column + `REQUEST_RECEIPT_FEE=${request.receipt_fee}, REQUEST_RECEIPT_TOTAL=${request.receipt_total}, REQUEST_RECEIPT_DATE=${request.receipt_date}, REQUEST_DATE_ISSUED=${request.date_issued}, REQUEST_DATE_EXPIRED=${request.date_expired}, `
            column = column + `REQUEST_CONDITION_NO_1=${request.condition_no_1}, REQUEST_CONDITION_NO_2=${request.condition_no_2}, REQUEST_CONDITION_NO_3=${request.condition_no_3}, REQUEST_CONDITION_NO_4=${request.condition_no_4}, `
            column = column + `REQUEST_IMAGE_NAME=${request.image_name}, REQUEST_TOTAL_IMAGE='${request.total_image}', REQUEST_STATUS='${request.status}', REQUEST_DELETE_LOGIC=${request.delete_logic}, REQUEST_IS_DELETED='${request.is_deleted}', `
            column = column + `REQUEST_LAST_UPDATE='${request.last_update}', REQUEST_USER_UPDATE='${request.user_update}' , `
            column = column + `REQUEST_STATUS_BEFORE='${request.status_before}', REQUEST_STATUS='${request.status}', `
            column = column + `ESTABLISHMENT_IS_LAND_OWNED = ${request.establishment_is_land_owned},ESTABLISHMENT_ADDRESS_ID = ${request.establishment_address_id},`
            //year 1
            column = column + `REQUEST_RECEIPT_FINE=${request.receipt_fine}, REQUEST_RECEIPT_FEE=${request.receipt_fee}, `
            column = column + `REQUEST_RECEIPT_TOTAL=${request.receipt_total}, REQUEST_RECEIPT_DATE=${request.receipt_date}, `
            //year 2 
            column = column + `REQUEST_RECEIPT_FINE_YEAR_2=${request.receipt_fine_year_2}, REQUEST_RECEIPT_FEE_YEAR_2=${request.receipt_fee_year_2}, `
            column = column + `REQUEST_RECEIPT_TOTAL_YEAR_2=${request.receipt_total_year_2}, REQUEST_RECEIPT_DATE_YEAR_2=${request.receipt_date_year_2}, `
            //year 3
            column = column + `REQUEST_RECEIPT_FINE_YEAR_3=${request.receipt_fine_year_3}, REQUEST_RECEIPT_FEE_YEAR_3=${request.receipt_fee_year_3}, `
            column = column + `REQUEST_RECEIPT_TOTAL_YEAR_3=${request.receipt_total_year_3}, REQUEST_RECEIPT_DATE_YEAR_3=${request.receipt_date_year_3}`

            let query = `UPDATE request SET ${column} WHERE REQUEST_NO='${request.no}' AND REQUEST_YEAR='${request.year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                console.log('UPDATE request sucess ')
                console.log(query)
                return resolve(`true`)
            })
        })
    }
    updateStatus(request) {
        return new Promise((resolve, reject) => {
            let column = `REQUEST_STATUS='${request.status}',REQUEST_STATUS_BEFORE ='${request.status_before}',`
            column = column + `REQUEST_LAST_UPDATE='${request.last_update}',REQUEST_USER_UPDATE='${request.user_update}',`
            column = column + `REQUEST_DATE_APPROVE=${request.date_approve}, STAFF_ID_APPROVE = ${request.staff_id_approve},`
            //year 1
            column = column + `REQUEST_RECEIPT_FINE=${request.receipt_fine}, REQUEST_RECEIPT_FEE=${request.receipt_fee}, `
            column = column + `REQUEST_RECEIPT_TOTAL=${request.receipt_total}, REQUEST_RECEIPT_DATE=${request.receipt_date}, `
            //year 2 
            column = column + `REQUEST_RECEIPT_FINE_YEAR_2=${request.receipt_fine_year_2}, REQUEST_RECEIPT_FEE_YEAR_2=${request.receipt_fee_year_2}, `
            column = column + `REQUEST_RECEIPT_TOTAL_YEAR_2=${request.receipt_total_year_2}, REQUEST_RECEIPT_DATE_YEAR_2=${request.receipt_date_year_2}, `
            //year 3
            column = column + `REQUEST_RECEIPT_FINE_YEAR_3=${request.receipt_fine_year_3}, REQUEST_RECEIPT_FEE_YEAR_3=${request.receipt_fee_year_3}, `
            column = column + `REQUEST_RECEIPT_TOTAL_YEAR_3=${request.receipt_total_year_3}, REQUEST_RECEIPT_DATE_YEAR_3=${request.receipt_date_year_3},`

            column = column + `STAFF_ID_MONEY=${request.staff_id_money},REQUEST_DATE_ISSUED=${request.date_issued},REQUEST_DATE_EXPIRED=${request.date_expired},`
            column = column + `REQUEST_DELETE_LOGIC =${request.delete_logic},REQUEST_IS_DELETED='${request.is_deleted}'`

            let query = `UPDATE request SET ${column} WHERE REQUEST_NO='${request.no}' AND REQUEST_YEAR='${request.year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                console.log(`Update id = ${request.no}/${request.year} status = ${request.status}`)
                return resolve(`true`)
            })
        })
    }
    updateStatusOnly(no, year, user, last_update, status, status_before) {
        return new Promise((resolve, reject) => {
            let column = `REQUEST_STATUS='${status}',`
            column = column + `REQUEST_LAST_UPDATE='${last_update}',REQUEST_USER_UPDATE='${user}'`
            if (status_before != undefined) {
                column = column + `, REQUEST_STATUS_BEFORE='${status_before}'`
            }
            let query = `UPDATE request SET ${column} WHERE REQUEST_NO='${no}' AND REQUEST_YEAR='${year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                console.log(`Update status request id = ${no}/${year} status = expire`)
                return resolve(`true`)
            })
        })
    }
    updateStatusDelete(object) {
        return new Promise((resolve, reject) => {
            let column = `REQUEST_IS_DELETED='${object.status}', REQUEST_USER_UPDATE = '${object.username}' ,REQUEST_LAST_UPDATE = '${object.last_update}'`
            let query = `UPDATE request SET ${column} WHERE REQUEST_NO='${object.id}' AND REQUEST_YEAR='${object.year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
}
module.exports = RequestDAO