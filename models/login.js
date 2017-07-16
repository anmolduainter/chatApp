/**
 * Created by anmol on 16/7/17.
 */

module.exports = (sequelize,Datatypes)=>{

   const Login=sequelize.define('login',{

       id:{

           type:Datatypes.DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true,

       },


       username:{

           type:Datatypes.DataTypes.STRING,
           allowNull:false
       },

       email:{

           type:Datatypes.DataTypes.STRING,
           allowNull:false

       }


   })

    return Login;

} ;
