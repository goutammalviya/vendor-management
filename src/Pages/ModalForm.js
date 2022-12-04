import React, { useEffect, useRef, useState } from "react";
import sheetService, { getSheetRows } from "../Services/SheetService2";
// import modal_cross from '../../../assets/Images/modal-cross.svg';
// import { Oval } from 'react-loader-spinner';
import "./Modal.css";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import TextError from "../Components/Formik/TextError";
import { CiCircleRemove } from "react-icons/ci";

const ModalForm = (props) => {
  const { modalId, data, setRenderModal, reFetchData } = props;
  const [projectCategoryList, setProjectCategoryList] = useState([]);
  useEffect(() => {
    const asyncFn = async () => {
      const sheets = await sheetService("projects");
      const projectCategoryListres = await getSheetRows(sheets);
      console.log(projectCategoryListres);
      setProjectCategoryList(projectCategoryListres);
    };
    asyncFn();
  }, []);
  const initialValues = {
    email: data.email,
    companyName: data["company name"],
    location: data.location,
    address: data["address"],
    contactPersonName: data["contact person name"],
    contactNumber: data["contact no"],
    vendorListCategory: data["vendor list category"],
    websiteUrl: data["website url"],
    linkdinUrl: data["linkedIn url"],
    checkBox: data["suggested"] === "suggested" ? true : false,
    friends: [
      {
        name: "",
        email: ""
      }
    ]
  };
  const handleSubmit = async (values) => {
    // navigate("/vendors");
    data.email = values.email;
    data["company name"] = values.companyName;
    data.location = values.location;
    data["address"] = values.address;
    data["contact person name"] = values.contactPersonName;
    data["contact no"] = values.contactNumber;
    data["vendor list category"] = values.vendorListCategory;
    data["website url"] = values.websiteUrl;
    data["linkedIn url"] = values.linkdinUrl;
    if (values.checkBox === true) {
      data["suggested"] = "suggested";
    } else {
      data["suggested"] = "";
    }

    await data.save();
    await reFetchData(false);
    document.getElementById("closeModal").click();
    setRenderModal(false);
  };
  const validationSchema = Yup.object({
    // email: Yup.string().required("Required*"),
    // companyName: Yup.string().required("Required*"),
    // location: Yup.string().required("Required*"),
    // address: Yup.string().required("Required*"),
    // contactPersonName: Yup.string().required("Required*"),
    // contactNumber: Yup.string().required("Required*"),
    vendorListCategory: Yup.string().required("Required*"),
    // websiteUrl: Yup.string().required("Required*"),
    // linkdinUrl: Yup.string().required("Required*"),
    checkBox: Yup.boolean()
  });
  console.log(data);
  return (
    <>
      <div
        style={{ zIndex: 5000 }}
        class="modal fade"
        id={modalId}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="2"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog"
          style={{ maxWidth: "inherit", margin: "50px" }}
        >
          <div class="modal-content bgg-primary">
            <div class="modal-header">
              <h5 class="modal-title fc-white" id="staticBackdropLabel">
                Update Drawing
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setRenderModal(false)}
              ></button>
            </div>
            <div class="modal-body">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                className="contact-form"
              >
                {({ values }) => (
                  <Form autoComplete="off">
                    <div className="row p-1">
                      <div className="col-12 col-md-6">
                        <div className="row">
                          <div className="col-12">
                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Project Name
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                placeholder="Project Name"
                                name="project"
                              />
                              <ErrorMessage
                                component={TextError}
                                name="project"
                              />
                            </div>

                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Date
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                type="date"
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
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Select Drawing
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                as="select"
                                placeholder="select drawing"
                                name="vendorListCategory"
                              >
                                {" "}
                                <option value="">Select Drawing</option>
                                <option value={""}>dummy</option>
                                <option value={""}>dummy</option>
                                <option value={""}>dummy</option>
                              </Field>
                              <ErrorMessage
                                component={TextError}
                                name="vendorListCategory"
                              />
                            </div>

                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Revision
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                as="select"
                                placeholder="select revision"
                                name="vendorListCategory"
                              >
                                {" "}
                                <option value="">Select Revision</option>
                                <option value={""}>dummy</option>
                                <option value={""}>dummy</option>
                                <option value={""}>dummy</option>
                              </Field>
                              <ErrorMessage
                                component={TextError}
                                name="vendorListCategory"
                              />
                            </div>

                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Select (kdos)
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                as="select"
                                placeholder="select revision"
                                name="vendorListCategory"
                              >
                                {" "}
                                <option value="">Select..</option>
                                <option value={""}>Email</option>
                                <option value={""}>advance copy</option>
                                <option value={""}>reissue</option>
                                <option value={""}>print</option>
                              </Field>
                              <ErrorMessage
                                component={TextError}
                                name="vendorListCategory"
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
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Upload drawing
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                type="file"
                                placeholder="upload"
                                name="linkdinUrl"
                              />
                              <ErrorMessage
                                component={TextError}
                                name="linkdinUrl"
                              />
                            </div>
                            <div className="py-2">
                              <FieldArray name="friends">
                                {({ insert, remove, push }) => (
                                  <div>
                                    {values.friends.length > 0 &&
                                      values.friends.map((friend, index) => (
                                        <div className="row" key={index}>
                                          <div className="col-5">
                                            <label
                                              htmlFor={`friends.${index}.name`}
                                              className="fs-5 fc-white ff-montserrat"
                                            >
                                              Upload drawing
                                            </label>
                                            <Field
                                              className="form-control br-none br-6 border-bottom"
                                              id=""
                                              type="file"
                                              placeholder="upload"
                                              name={`friends.${index}.name`}
                                            />
                                            <ErrorMessage
                                              component={TextError}
                                              name={`friends.${index}.name`}
                                            />
                                          </div>

                                          <div className="col-7">
                                            <label
                                              htmlFor={`friends.${index}.email`}
                                              className="fs-5 fc-white ff-montserrat"
                                            >
                                              Drawing name
                                            </label>
                                            <Field
                                              name={`friends.${index}.email`}
                                              placeholder="Drawing name"
                                              type="textt"
                                              className="form-control br-none br-6 border-bottom"
                                            />
                                            <ErrorMessage
                                              component={TextError}
                                              name={`friends.${index}.name`}
                                            />
                                          <div className="">
                                            <button
                                              type="button"
                                              className={`${index > 0 ? "": "d-none"}`}
                                              onClick={() => remove(index)}
                                            >
                                              {index > 0 &&  ( "remove")}
                                            </button>
                                          </div>
                                          </div>
                                        </div>
                                      ))}
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() =>
                                        push({ name: "", email: "" })
                                      }
                                    >
                                      Add More
                                    </button>
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                            <div className="py-2">
                              <label
                                htmlFor=" required"
                                className="fs-5 fc-white ff-montserrat"
                              >
                                Upload checklist
                              </label>
                              <Field
                                className="form-control br-none br-6 border-bottom"
                                id=""
                                type="file"
                                placeholder="upload"
                                name="linkdinUrl"
                              />
                              <ErrorMessage
                                component={TextError}
                                name="linkdinUrl"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="button text-center py-3 mt-3">
                      <div class="modal-footer d-flex justify-content-around">
                        <button
                          type="button"
                          id="closeModal"
                          class="btn btn-lg btn-danger d-none fw-normal ff-montserrat px-5 py-2"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>

                        <button
                          type="submit"
                          className="btn btn-lg btn-primary fw-normal ff-montserrat px-5 py-2"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
