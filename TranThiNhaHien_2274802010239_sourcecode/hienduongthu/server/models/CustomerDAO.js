const mongoose = require('mongoose');
const Models = require('./Models');
const MyConstants = require('../utils/MyConstants');  

const CustomerDAO = {
    async insert(customer) {
        try {
            // Kiểm tra nếu _id không có, tạo _id mới
            if (!customer._id) {
                customer._id = new mongoose.Types.ObjectId();
            }

            const newCustomer = new Models.Customer(customer);
            const savedCustomer = await newCustomer.save(); // Lưu khách hàng vào cơ sở dữ liệu
            return savedCustomer;  // Trả về kết quả lưu
        } catch (error) {
            console.error('Error saving customer:', error);
            throw new Error('Customer save failed');
        }
    },

    async selectByID(id) {
        if (!id) return null;
        try {
            const customer = await Models.Customer.findById(id).exec();
            if (!customer) {
                console.error(`Customer with ID ${id} not found`);
                return null;
            }
            return customer;
        } catch (error) {
            console.error('Error fetching customer by ID:', error);
            throw new Error('Error fetching customer');
        }
    },

    async selectByUsername(username) {
        if (!username) return null;
        try {
            const customer = await Models.Customer.findOne({ username }).exec();
            return customer;
        } catch (error) {
            console.error('Error fetching customer by username:', error);
            throw new Error('Error fetching customer');
        }
    },
    async updateCustomer(id, updates) {
        try {
            // Cập nhật thông tin người dùng
            const updatedCustomer = await Models.Customer.findByIdAndUpdate(id, updates, { new: true });
            return updatedCustomer;  // Trả về thông tin người dùng đã cập nhật
        } catch (error) {
            console.error('Error updating customer:', error);
            throw new Error('Error updating customer');
        }
    },
    async checkout(customerId, cartItems) {
        try {
            const Order = Models.Order; // đảm bảo bạn đã tạo Order model

            const newOrder = new Order({
                customerId: customerId,
                items: cartItems,
                createdAt: new Date(),
            });
            const savedOrder = await newOrder.save();
            return savedOrder;
        } catch (error) {
            console.error("Error during checkout:", error);
            throw error;
        }
    },
};

module.exports = CustomerDAO;
