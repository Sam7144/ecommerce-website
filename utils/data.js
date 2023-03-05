import bcrypt from 'bcryptjs'
const data={
    users:[
        {
            name:'samuel',
            'email':'samutech144@gmail.com',
            password:bcrypt.hashSync('123456789'),
            'isAdmin':true
        },
        {
            name:'njoki',
            'email':'samutech1442@gmail.com',
            password:bcrypt.hashSync('123456789'),
            'isAdmin':false
        }
    ],
    products:[
        {
            name:"shirt",
            slug:'cotton-shirt',
            category:"shirst",
            image:"/images/shirt1.jpg",
            price:80,
            ratings:4.5,
            brand:"nike",
            numReviews:10,
            countInStock:20,
            description:"Avery good shirt in market"
        }
        ,
        {
            name:"shirt-fit",
            slug:'shirt-fit',
            category:"shirst",
            image:"/images/shirt2.jpg",
            price:40,
            rating:4.5,
            brand:"nike",
            numReviews:10,
            countInStock:20,
            description:"Avery good shirt"
        },
        {
            name:"shirt2-fit",
            slug:'trouser-mi',
            category:"shirst",
            image:"/images/shirt3.jpg",
            price:70,
            rating:4.5,
            brand:"nike",
            numReviews:10,
            countInStock:20,
            description:"Avery good shirt in market"
        },
        {
            name:"pant1",
            slug:'pant-891',
            category:"pants",
            image:"/images/pants1.jpg",
            price:70,
            rating:4.5,
            brand:"nike",
            numReviews:10,
            countInStock:20,
            description:"Avery good shirt in market"
        }
        ,
        {
            name:"pant2",
            slug:'pang-tlkk',
            category:"pants",
            image:"/images/pants2.jpg",
            price:70,
            rating:4.5,
            brand:"nike",
            numReviews:10,
            countInStock:20,
            description:"Avery good shirt in market"
        },
        {
            name:"pant3",
            category:"panthjjks",
            slug:"samutech-jeans",
            image:"/images/pants3.jpg",
            price:70,
            rating:4.5,
            brand:"adidas",
            numReviews:40,
            countInStock:20,
            description:"Avery good shirt in market"
        }
    ]
}
export default data;