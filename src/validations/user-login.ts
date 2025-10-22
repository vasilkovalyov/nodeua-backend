import Joi from "joi";
import { UserLoginParams } from "../types/user";
import { AuthValidation } from "../constants/validation-messages";

const studentRegistrationSchema = Joi.object<UserLoginParams>({
  email: Joi.string().required().messages({
    "string.login": AuthValidation.LoginValidation
  }),
  password: Joi.string()
    .required()
    .message(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)"
    )
});

export default studentRegistrationSchema;
