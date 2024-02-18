const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING,allowNull: false},
    number: {type: DataTypes.STRING, unique:true,allowNull: false},
    fio: {type: DataTypes.STRING,allowNull: false},
    birthdate: {type: DataTypes.DATEONLY,allowNull: false},
    role:{type:DataTypes.STRING,allowNull: false,defaultValue:'user'}
})

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type:DataTypes.INTEGER,allowNull: false,defaultValue:'0'}
},{timestamps: false})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    parentId: {type: DataTypes.INTEGER, allowNull: true},
    name: {type: DataTypes.STRING,allowNull: false},
    img:{type:DataTypes.STRING,allowNull: false}
})

const Manufacturer = sequelize.define('manufacturer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    logo: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING,allowNull: false},
    contact: {type: DataTypes.STRING,allowNull: false}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.STRING,allowNull: false},
    price:{type:DataTypes.INTEGER,allowNull: false, defaultValue:0}
})

const OrderProducts = sequelize.define('order_products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count:{type:DataTypes.INTEGER,allowNull: false}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER,allowNull: false},
    amount: {type:DataTypes.INTEGER,allowNull: false,defaultValue:0},
    description: {type: DataTypes.STRING,allowNull: true},
    expirationdate: {type: DataTypes.STRING,allowNull: true},
    storageconditions: {type: DataTypes.STRING,allowNull: true},
    structure: {type: DataTypes.STRING, allowNull:true},
    weight_volume: {type: DataTypes.STRING, allowNull: true},
})

const ProductImages = sequelize.define('product_images', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filename: {type: DataTypes.STRING, allowNull: false},
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text:{type: DataTypes.STRING, allowNull: false},
    rate:{type:DataTypes.INTEGER,allowNull: false,defaultValue:0}
})

const ReviewStatus = sequelize.define('review_status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false}
},{timestamps: false})

const OrderStatus = sequelize.define('order_status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false}
},{timestamps: false})

User.hasMany(Cart)
Cart.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

Product.hasMany(Cart)
Cart.belongsTo(Product)

Product.hasMany(ProductImages)
ProductImages.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

Manufacturer.hasMany(Product)
Product.belongsTo(Manufacturer)

Product.hasMany(OrderProducts)
OrderProducts.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)

OrderStatus.hasMany(Order)
Order.belongsTo(OrderStatus)

Order.hasMany(OrderProducts)
OrderProducts.belongsTo(Order)

ReviewStatus.hasMany(Review)
Review.belongsTo(ReviewStatus)

module.exports = {
    User,
    Cart,
    Category,
    Manufacturer,
    Order,
    OrderProducts,
    Product,
    ProductImages,
    Review,
    ReviewStatus,
    OrderStatus
}





