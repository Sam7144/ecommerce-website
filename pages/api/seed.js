import data from '../../utils/data'
import User from '../../models/user'
import db from '../../utils/db'
import Product from '../../models/Product'
const handler=async(req,res)=>{
   await db.connect()
   await User.deleteMany()
   await User.insertMany(data.users)
   await Product.deleteMany()
   await Product.insertMany(data.products)
   await db.disconnect()
   res.send({message:"seeded succesfully"})
}
export default handler;