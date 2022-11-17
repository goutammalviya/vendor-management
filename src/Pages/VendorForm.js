import React, { useEffect, useRef } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../Components/Formik/TextError";
import sheetService, { getSheetRows, addRow } from "../Services/SheetService2";
import { useNavigate } from "react-router-dom";
import useDrive from "../Services/driveService";
import { usePostVendorFormMutation } from "../Services/dataServices";

const VendorForm = () => {
  const [postVendorForm , {isLoading}] = usePostVendorFormMutation()
  let sheet = null;
  const {UploadFiles} = useDrive();
  const fileRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const asyncFn = async () => {
      const sheets = await sheetService("vendors");
      sheet = sheets;
      console.log(await getSheetRows(sheet));
    };
    asyncFn();
  }, []);
  const initialValues = {
    email: "",
    companyName: "",
    location: "",
    address: "",
    contactPersonName: "",
    contactNumber: "",
    emailAdress: "",
    vendorListCategory: "",
    websiteUrl: "",
    linkdinUrl: "",
    uploadPhotoUrl: "",
  };
  const handleSubmit = async values => {
    const files = fileRef.current.files;
    let fileArr = Object.keys(files).map(f=>files[f]);
  const fileDriveRes =  await UploadFiles(fileArr);
   let data = {
      email: values.email,
      "company name": values.companyName,
      location: values.location,
      address: values.address,
      "contact person name": values.contactPersonName,
      "contact no": values.contactNumber,
      "email address": values.emailAdress,
      "vendor list category": values.vendorListCategory,
      "website url": values.websiteUrl,
      "linkedIn url": values.linkdinUrl,
      "profile url": values.uploadPhotoUrl,
      "profile name": values.uploadPhotoUrl,
    };
    console.log(fileDriveRes);
    fileDriveRes.forEach(async (r) => {
        
      data["profile url"] = r.url;
      data["profile name"] = r.name;
      console.log(data);
      console.log(await addRow(sheet, data));
    });
   
    try {
      const response = await postVendorForm("").unwrap();
    } catch (error) {
      console.log(error);
    }

    // navigate("/vendors");
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required*"),
    companyName: Yup.string().required("Required*"),
    location: Yup.string().required("Required*"),
    address: Yup.string().required("Required*"),
    contactPersonName: Yup.string().required("Required*"),
    contactNumber: Yup.string().required("Required*"),
    emailAdress: Yup.string().required("Required*"),
    vendorListCategory: Yup.string().required("Required*"),
    websiteUrl: Yup.string().required("Required*"),
    linkdinUrl: Yup.string().required("Required*"),
    uploadPhotoUrl: Yup.string().required("Required*"),
  });

  return (
    <div className="container-fluid h-100">
      <div className="text-center h1 py-4 fw-semibold">Vendors Data Form</div>
      <div className="center-xy">
        <div className="container box-shadow-2 border-none card">
          <div>
            {/* <SheetService/> */}
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              className="contact-form">
              <Form autoComplete="off">
                <div className="row p-md-5">
                  <div className="col-12 col-md-6">
                    <div className="row">
                      <div className="col-12">
                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Email
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="email"
                          />
                          <ErrorMessage component={TextError} name="email" />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Company name
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="companyName"
                          />
                          <ErrorMessage
                            component={TextError}
                            name="companyName"
                          />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Location
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="location"
                          />
                          <ErrorMessage component={TextError} name="location" />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Address
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="address"
                          />
                          <ErrorMessage component={TextError} name="address" />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Contact person name
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="contactPersonName"
                          />
                          <ErrorMessage
                            component={TextError}
                            name="contactPersonName"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="row">
                      <div className="col-12">
                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Contact number
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="contactNumber"
                          />
                          <ErrorMessage
                            component={TextError}
                            name="contactNumber"
                          />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Email adress
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="emailAdress"
                          />
                          <ErrorMessage
                            component={TextError}
                            name="emailAdress"
                          />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Vendor list category
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="vendorListCategory"
                          />
                          <ErrorMessage
                            component={TextError}
                            name="vendorListCategory"
                          />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Website Url
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="websiteUrl"
                          />
                          <ErrorMessage
                            component={TextError}
                            name="websiteUrl"
                          />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Linkdin Url
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            placeholder="Name"
                            name="linkdinUrl"
                          />
                          <ErrorMessage
                            component={TextError}
                            name="linkdinUrl"
                          />
                        </div>

                        <div className="py-2">
                          <label
                            htmlFor=" required"
                            className="fs-5 ff-montserrat">
                            Upload photo
                          </label>
                          <Field
                            className="form-control border-0 border-bottom rounded-0"
                            id=""
                            innerRef={fileRef}
                            multiple
                            placeholder="Name"
                            name="uploadPhotoUrl"
                            type="file"
                          />
                          <ErrorMessage
                            component={TextError}
                            name="uploadPhotoUrl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="button text-center py-3">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary rounded-0 fw-normal ff-montserrat px-5 py-2">
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
