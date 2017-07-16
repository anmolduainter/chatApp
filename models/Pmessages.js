/**
 * Created by anmol on 16/7/17.
 */

module.exports= (sequelize,Datatype)=>{

    const PMessage=sequelize.define('PMessages',{

        id:{
            type:Datatype.DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },

        login_id:{

            type:Datatype.DataTypes.INTEGER,
            allowNull:false

        },

        message:{

            type:Datatype.DataTypes.STRING

        }



    },{
        underscored:true
    })

  return PMessage;

}