module.exports = {
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },

    formatResponse: (data, message = 'Success', status = 200) => {
        return {
            status,
            message,
            data,
        };
    },

    hashPassword: async (password) => {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    },

    comparePassword: async (password, hash) => {
        const bcrypt = require('bcrypt');
        return await bcrypt.compare(password, hash);
    },
};