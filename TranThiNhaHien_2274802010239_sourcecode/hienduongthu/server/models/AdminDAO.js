require('../utils/MongooseUtil');
const Models = require('./Models');

const AdminDAO = {
    async selectByUsernameAndPassword(username, password) {         // async function selectByUsernameAndPassword(username, password) là một hàm bất đồng bộ (async function) dùng để lấy thông tin admin từ cơ sở dữ liệu theo username và password.
        const query = { username: username, password: password };        // const query = { username: username, password: password }; là tạo một đối tượng query với thông tin username và password.
        const admin = await Models.Admin.findOne(query);                // const admin = await Models.Admin.findOne(query); là gọi hàm findOne của Models.Admin để tìm kiếm admin theo query.
        //findOne là một hàm bất đồng bộ (async function) dùng để tìm kiếm một tài liệu trong cơ sở dữ liệu theo điều kiện query.
        //Nếu tìm thấy tài liệu thì trả về tài liệu đó, nếu không tìm thấy thì trả về null.
        //query là một đối tượng chứa các điều kiện tìm kiếm.
        //Models.Admin là một đối tượng chứa các phương thức để thao tác với collection Admin trong cơ sở dữ liệu.
        return admin;
    }
};

module.exports = AdminDAO;            
