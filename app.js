const dbSetup=require('./db/db-setup');
const User=require('./db/models/users')
const Zone=require('./db/models/zone')
const Location=require('./db/models/location')
const Partners=require('./db/models/partners')
const formElements=require('./db/models/formElement')
const formOptions=require('./db/models/formOptions')
const express=require ('express')
const bodyParser=require('body-parser')
const cors=require("cors")
const app = express();
const userRoute=require('./routes/userRoute');
const ZoneRoute=require('./routes/zoneRoute');
const LocationRoute=require('./routes/locationRoute');
const PartnerRoute=require('./routes/partnerRoute');
const formRoute=require('./routes/formRoute');
// const optionRoute=require('./routes/optionRoute');
dbSetup();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
};

// app.post('*', bodyParser.json());
app.use(bodyParser.json())
app.use(express.json());
// Configure CORS
 
app.use(cors(corsOptions));
app.use("/",userRoute);
app.use("/",ZoneRoute);
app.use("/",LocationRoute);
app.use("/",PartnerRoute);
app.use("/",formRoute);
// app.use("/",optionRoute);
app.listen(3001, () => console.log('Server is running on http://localhost:3001'));
