import React from 'react'
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "./../Components/Formik/TextError";


const VendorForm = () => {
    const initialValues = {
        name: "",
        email: "",
        mobileNumber: "",
        located: "",
        onYourMind: "",
        checkBox: false,
      };
      const handleSubmit = async (values) => {
   
        console.log(values)
      
      };
      const validationSchema = Yup.object({
        name: Yup.string().required("Required*"),
        email: Yup.string().email("Invalid Mail").required("Required*"),
        located: Yup.string().required("Required*"),
        mobileNumber: Yup.number().required("Required*").min(11111111, "Invalid Mobile Number").max(999999999999, "Invalid Mobile Number"),
        onYourMind: Yup.string().required("Required*"),
        checkBox: Yup.boolean().oneOf([true], "Required*"),
      });
    
  return (
    <div className='center-xy h-100'>
       <div className='row center-xy'>
      <div className="col-10 col-md-7 ">
    <div>
    <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        className="contact-form"
      >
        <Form autoComplete="off">
          <div className="form-floating mb-3">
            <Field
              className="form-control border-0 border-bottom rounded-0"
              id="floatingName"
              placeholder="Name"
              name="name"
            />
            <ErrorMessage component={TextError} name="name" />
            <label
              htmlFor="floatingName required"
              className="fs-5 ff-montserrat"
            >
              Name <sup className="fw-semibold">*</sup>
            </label>
          </div>
          <div className="form-floating mb-3">
            <Field
              type="text"
              className="form-control border-0 border-bottom rounded-0"
              id="floatingEmail"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage component={TextError} name="email" />
            <label
              htmlFor="floatingEmail required"
              className="fs-5 ff-montserrat"
            >
              Email Address <sup className="fw-semibold">*</sup>
            </label>
          </div>
          <div className="form-floating mb-3">
            <Field
              type="number"
              className="form-control border-0 border-bottom rounded-0"
              id="floatingMobile"
              placeholder="Phone number"
              name="mobileNumber"
            />
            <ErrorMessage component={TextError} name="mobileNumber" />
            <label
              htmlFor="floatingMobile required"
              className="fs-5 ff-montserrat"
            >
              Phone Number <sup className="fw-semibold">*</sup>
            </label>
          </div>
          <div className="form-floating mb-3">
            <Field
              type="tel"
              className="form-control border-0 border-bottom rounded-0"
              id="floatingMobile"
              placeholder="Location"
              name="located"
            />
            <ErrorMessage component={TextError} name="located" />
            <label
              htmlFor="floatingMobile required"
              className="fs-5 ff-montserrat"
            >
              Where are you located
            </label>
          </div>
          <div className="form-floating mb-3">
            <Field
              type="tel"
              className="form-control border-0 border-bottom rounded-0"
              id="floatingMobile"
              placeholder="Enter"
              name="onYourMind"
            />
            <ErrorMessage component={TextError} name="onYourMind" />
            <label
              htmlFor="floatingMobile required"
              className="fs-5 ff-montserrat"
            >
              What's on your mind
            </label>
          </div>
          <div className="form-floating mb-3">
            <div className="text-justify">
              <Field type="checkbox" className="" name="checkBox"/>
              <span className=" ff-montserrat px-2">
                I am Okay sharing my personal information with Baelworks and I
                have had a look at your{" "}
                <span className="fc-blue fw-bold">“Privacy Policy”</span> to see
                how you use it.
              </span>
            </div>
          </div>
          <ErrorMessage component={TextError} name="checkBox" />
        
          <div className="button text-center py-3">
            <button
              type="submit"
              className="btn btn-lg btn-secondary rounded-0 fw-normal ff-montserrat px-5 py-2"
            >
             
            </button>
          </div>
        </Form>
      </Formik>
    </div>
      </div>
       </div>
    </div>
  )
}

export default VendorForm






 