/**
 * Created by anmol on 16/7/17.
 */

module.exports= (sequelize,Datatype)=>{

    const BroadMessage=sequelize.define('Messages',{

        id:{
            type:Datatype.DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },

        message:{

          type:Datatype.DataTypes.STRING

        }



    },{
        underscored:true
    })

    return BroadMessage;


}