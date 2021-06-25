import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import validator from "validator";

export default function UpdateContact(props) {
    let history = useHistory();

    // console.log(props)
    const { id, name, email, phone_num } = props.location.state.contact;

    const [nameVal, setnameVal] = useState(name);
    const [emailVal, setemailVal] = useState(email);
    const [phoneVal, setphoneVal] = useState(phone_num);
    const [message, setmessage] = useState(false);

    const updateContact = async (e) => {
        e.preventDefault();

        let updatedContact = {
            id: id,
            name: nameVal,
            email: emailVal,
            phone_num: phoneVal,
        };

        if (
            nameVal.length !== 0 &&
            validator.isEmail(emailVal || "") &&
            validator.isMobilePhone(phoneVal || "")
        ) {
            props.setContacts(
                props.contacts.map((contact) => {
                    return contact.id === id ? { ...updatedContact } : contact;
                })
            );
            setnameVal("");
            setemailVal("");
            history.push("/");
        } else {
            setmessage(true);
        }
    };

    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
            >
                <div className="add-content bg-dark text-white">
                    <h3 className="text-center pb-3">Update Contact</h3>
                    <form onSubmit={updateContact}>
                        <div className="form-group mb-3">
                            <h6
                                htmlFor="exampleInputName"
                                className="form-label ml-2"
                            >
                                Name
                            </h6>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="exampleInputName"
                                value={nameVal}
                                onChange={(e) => setnameVal(e.target.value)}
                            />
                            <div className="form-text mt-2 text-danger">
                                {message ? <span>Name is Required</span> : ""}
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <h6
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Mobile Number
                            </h6>
                            <input
                                type="text"
                                name="phone_num"
                                className="form-control"
                                id="exampleInputName"
                                value={phoneVal}
                                onChange={(e) => setphoneVal(e.target.value)}
                            />
                            <div className="form-text mt-2 text-danger">
                                {message ? (
                                    <span>
                                        Please Enter valid Mobile Number
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <h6
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Email
                            </h6>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={emailVal}
                                onChange={(e) => setemailVal(e.target.value)}
                            />
                            <div className="form-text mt-2 text-danger">
                                {message ? (
                                    <span>Please Enter valid Email</span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div className="button-field d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-warning px-5 mt-2"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
