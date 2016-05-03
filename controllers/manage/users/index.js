/**
 * @author yanglei
 * @date 20160429
 * @fileoverview 用户管理
 */
var orm = require("orm");

module.exports = (Router) => {
    Router.get("/users/find", (req, res, next) => {
        var query = req.query,
            limit = query.limit || 10,
            username = query.username || "",
            page = query.page || 1,
            is_admin = req.session.userInfo.is_admin,
            params = {
                username : orm.like(username + "%"),
                is_admin : orm.lt(is_admin)
            },
            sql = "SELECT * FROM tbl_dataplatform_nodejs_users2"
                + " WHERE username like '" + username + "%' AND is_admin < " + is_admin
                + " LIMIT " + (page - 1) * limit + "," + limit;
        req.models.User2.count(params, (err, count) => {
            if(!err) {
                req.db.driver.execQuery(sql, (err, data) => {
                        if(!err) {
                            res.json({
                                code : 200,
                                count : count,
                                data : data
                            });
                        } else {
                            next(err);
                        }
                    });
            } else {
                next(err)
            }
        });
    });

    Router.post("/users/update", (req, res, next) => {
        var params = req.body;
        req.models.User2.find({
            id : params.id
        }, (err, data) => {
            if(!err) {
                if(data.length) {
                    data[0].status = params.status || data[0].status;
                    var limited = eval('(' + data[0].limited + ')');
                    
                } else {
                    res.json({
                        success : false,
                        msg : "未查找到该用户"
                    })
                }
            } else {
                next(err);
            }
        });
    });

     return Router;
};