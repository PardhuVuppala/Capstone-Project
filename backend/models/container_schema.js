const schema_mongoose = require('mongoose');

const ContainerSchema = schema_mongoose.Schema(
    {
        ownerid : {type : String},
        con_uniqueid : {type :String},
        con_type:{type:String},
        con_dimension:{type:String},
        con_booking:{type :String} ,
        con_datetime: { type: Date, default: Date.now }
    },
    {
        timestamps:true
    }
);

module.exports = schema_mongoose.model('con_details_collection', ContainerSchema);


