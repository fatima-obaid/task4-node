const mongodb = require ('mongodb')
const mongoClient = mongodb.MongoClient
const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbname = "task"

mongoClient.connect(connectionUrl , (error,res1) =>{
    if(error){
        return  console.log('error has occured')
    }
    console.log('All Perf')
    const db = res1.db(dbname)

// 1- insertone 2 doc
    db.collection('users').insertOne({
        name : 'fatma',
        age : 29
    },(error , data) => {
        if(error){
            console.log('Unable to insert Data')
        }
        console.log(data.insertedId)
    })

    // insertmany 10 -> 5 age=27y
    db.collection ('users').insertMany(
       [ {
            name: 'aisha',
            age: 27
        },
        {
            name: 'wesal',
            age: 27
        },
        {
            name: 'reem',
            age: 27
        },
        {
            name: 'hossam',
            age: 27
        },
        {
            name: 'ali',
            age: 27
        },
        {
            name: 'noha',
            age: 28
        },
        {
            name: 'mohamed',
            age: 29
        },
        {
            name: 'mone',
            age: 30
        },
        {
            name: 'aya',
            age: 32
        }, {
            name: 'mohand',
            age: 34
        }] , (error,data)=>{
            if(error){
                console.log('Unable to insert data')
            }
            console.log(data.insertedCount)
        } 
    )
  /////////////////////////////////////////////////////////////////////

  //3- findOne  that match filter age=27y

  db.collection('users').find({age:27}).toArray((error , users)=>{
    if (error) {
        return console.log('error has occured')
    }
    console.log(users)
  })

// 4-  to limit number (3) from age=27
  db.collection('users').find({age:27}).limit(3).toArray((error , users)=>{
    if (error) {
        return console.log('error has occured')
    }
    console.log(users)
  })
  /////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////
// 5- نعدل عل اول اربعه اسم 
db.collection('users').find({}).limit(4).toArray((eror, users) => {
    if (eror) {
        return console.log('error has occured')
    }
const userIds = users.map(user => user._id);
    
    db.collection('users').updateMany(
        { _id: { $in: userIds } },
        {
            $set: { name: "salem" },
            $inc: { age: 4 }
        }
    ).then((data1) => {
        console.log(`${data1.modifiedCount} documents were modified`);
    }).catch((error) => {
        console.error('Error updating users:', error);
    });
});

// 6- inc =10 {}
db.collection('users').updateMany({},{
    $inc: {age: 10}
}).
then((data1) => {
    console.log(`${data1.modifiedCount} documents were modified`);
}).catch((error) => {
    console.error('Error updating users:', error);
});

//   7- deletmany age=41 
    db.collection('users').deleteMany({age:41})
    .then((data1)=>{console.log(data1.deletedCount)})
       
    .catch((error)=> {console.log(error)})









})

 