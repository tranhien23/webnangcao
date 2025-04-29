const mongoose = require('mongoose');
const Models = require('./Models');

const CategoryDAO = {
  async selectAll() {
    return await Models.Category.find({});    //await là một từ khóa dùng để đợi cho đến khi một promise được giải quyết.
  },

  async insert(category) {
    if (!category || !category.name) {        //Kiểm tra xem category có tồn tại hay không và category.name có tồn tại hay không.
      throw new Error('Category object is undefined or missing name');      //Nếu không tồn tại thì ném ra một lỗi.
    }

    category._id = new mongoose.Types.ObjectId();     //Tạo một ObjectId mới cho category.
    //mongoose.Types.ObjectId là một hàm dùng để tạo một ObjectId mới.
    return await Models.Category.create(category);
  },
  async update(category) {
    const newvalues = { name: category.name };
    const result = await Models.Category.findByIdAndUpdate(
      category._id,      //Tìm kiếm category theo _id.
      newvalues,      //Cập nhật category với newvalues.
      { new: true }    //Trả về category đã cập nhật.
    );
    return result;
  },
  async delete(_id) {
    try {
      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {    //isValid là một hàm dùng để kiểm tra xem một ObjectId có hợp lệ hay không.
        //ObjectId là một kiểu dữ liệu dùng để lưu trữ một giá trị duy nhất cho mỗi tài liệu trong cơ sở dữ liệu.
        throw new Error('Invalid Category ID');
      }
      
      const result = await Models.Category.findByIdAndDelete(_id);
      return result;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
  // async selectByID(_id) {
  //   try {
  //     console.log("Finding category with ID:", _id);
  //     const category = await Models.Category.findById(_id).exec();
  //     console.log("Category found:", category);
  //     return category;
  //   } catch (error) {
  //     console.error("Error in selectByID:", error);
  //     return null;
  //   }
  // },
  // async selectByID(_id){
  //   const category = await Models.Category.findById(_id).exec();
  //   return category;
  // }
  async selectByID(_id) {
    try {
      console.log("Finding category with ID:", _id);
      const category = await Models.Category.findById(_id).exec();
      console.log("Category found:", category);
      return category;
    } catch (error) {
      console.error("Error in selectByID:", error);
      return null;
    }
  }
};


module.exports = CategoryDAO;
