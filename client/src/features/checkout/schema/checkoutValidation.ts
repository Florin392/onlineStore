import * as yup from "yup";


export const validationSchema = yup.object({
    fullName:yup.string().required("Full name is required"),
    address1:yup.string().required("Address field is required"),
    address2:yup.string().required("Address field is required"),
    city:yup.string().required("City field is required"),
    state:yup.string().required("State field is required"),
    zip:yup.string().required("Zip field is required"),
    country:yup.string().required("Country field is required"),
})