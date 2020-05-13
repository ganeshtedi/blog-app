const validator =require("validator");
const isEmpty =require("is-empty");

module.exports =validateLoginInput = data =>{
    let errors={};

    let{ email,password } =data;
    email =!isEmpty(email)?email:"";
    password=!isEmpty(password)?password:"";

    if(validator.isEmpty(email) && !validator.isEmail(email)){
        errors.email = "Email is required and valid email";
    }

    if (validator.isEmpty(password)){
        errors.password ="passwword is required";

    }
    else if(!validator.isLength(password,{min: 6,max:20})){
        errors.password="password must be atleast six charachters";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };

};