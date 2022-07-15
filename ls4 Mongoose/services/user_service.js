const {User} = require("../db");

module.exports = {
    find: (params = {}) => {
        return User.find(params);
    },
    findByID: (id) => {
        return User.findById(id);
    },
    create: (user) => {
        return User.create(user);
    },
    findByIdAndDelete: (params) => {
         return User.deleteOne(params);
    },
    update:(params,newUser,options={new:true})=>{
        return User.findOneAndUpdate(params,newUser,options)
    }
}