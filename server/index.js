const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
//Available Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())
app.use('/api/auth',require('./Routes/common/auth'))
app.use('/api/role',require('./Routes/admin/role'))
app.use('/api/assignment',require('./Routes/admin/assignment'))
app.use('/api/event',require('./Routes/admin/event'))
app.use('/api/staff',require('./Routes/admin/staff'))
app.use('/api/user',require('./Routes/admin/user'))
app.use('/api/vendor',require('./Routes/admin/vendor'))
app.use('/api/waiter',require('./Routes/admin/waiter'))
app.use('/api/photographer',require('./Routes/admin/photographer'))
// app.use('/api/buses',require('./Routes/admin/buses'))
// app.use('/api/destination',require('./Routes/admin/destination'))
// app.use('/api/driver',require('./Routes/admin/driver'))
// app.use('/api/routes',require('./Routes/admin/routes'))
// app.use('/api/services',require('./Routes/admin/services'))
// app.use('/api/faqs',require('./Routes/admin/faqs'))
// app.use('/api/bookings',require('./Routes/user/bookings'))
// app.use('/api/seats',require('./Routes/user/seats'))
// app.use('/api/expences',require('./Routes/admin/expences'))
// app.use('/api/expencecategory',require('./Routes/admin/expencecategory'))
// app.use('/api/contacts',require('./Routes/user/contacts'))

app.listen(port, () => {
  console.log(`evenTo backend listening at http://localhost:${port}`)
})