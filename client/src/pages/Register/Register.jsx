import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layouts/Layout'
import { useRegisterMutation } from '../../store/Features/userApi';

function Register() {
    const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const validation = (e) => {
        const ErrorList = {};
        for (let field in formData) {
            if (!formData[field]) {
                ErrorList[field] = `${field} is required.`;
            }
        }
        return ErrorList;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // perform validation and check of errors
        const validErrors = validation();
        if (Object.keys(validErrors).length > 0) {
            setErrors(validErrors)
            return;
        }
        // clear previous error 
        setErrors({});

        try {
            // regiter user
            const result = await register(formData).unwrap();
            console.log('Registration successful:', result);

            // Reset form data on successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
            });

            // Set success message
            setSuccess('Registration successful!');


        } catch (error) {
            console.error('Registration failed:', error);

            setErrors({ general: 'Registration failed. Please try again.' });
        }
    }


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const validErrors = validation();
    //     if (Object.keys(validErrors).length > 0) {
    //         setErrors(validErrors)
    //     } else {
    //         setErrors({});
    //         try {
    //             const response = await fetch('http://localhost:4545/api/user/register', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(formData),
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             const data = await response.json();
    //             console.log('Form submitted:', data);
    //             setSuccess('Registration successful!');
    //             setFormData({
    //                 name: '',
    //                 email: '',
    //                 password: '',
    //             });
    //         } catch (error) {
    //             console.error('There was a problem with the fetch operation:', error);
    //             setErrors({ submit: 'Failed to submit form. Please try again.' });
    //         }

    //     }
    //     // // Handle form submission, e.g., send data to the server
    //     // console.log('Form submitted:', formData);
    // }
    return (
        <>
            <Layout>
                <div className="login-page mt-100">
                    <Container>
                        <form action="#" className="login-form common-form mx-auto" onSubmit={handleSubmit}>
                            <div className="section-header mb-3">
                                <h2 className="section-heading text-center">Register</h2>
                            </div>
                            <Row>
                                <Col xs={12} >
                                    <fieldset>
                                        <label className="label">User Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                        {errors?.name && <span>{errors.name}</span>}
                                    </fieldset>
                                </Col>
                                {/* <Col xs={12} >
                                    <fieldset>
                                        <label className="label">Last name</label>
                                        <input type="text" />
                                    </fieldset>
                                </Col> */}
                                <Col xs={12} >
                                    <fieldset>
                                        <label className="label">Email address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                        {errors?.email && <span className='text-danger text-capitalize fw-bold'>{errors.email}</span>}
                                    </fieldset>
                                </Col>
                                <Col xs={12} >
                                    <fieldset>
                                        <label className="label">Password</label>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                                        {errors?.password && <span className='text-danger text-capitalize fw-bold'>{errors.password}</span>}
                                    </fieldset>
                                </Col>
                                <Col xs={12} className="mt-3">
                                    <button type="submit" className="btn-primary d-block mt-3 btn-signin">CREATE</button>
                                </Col>
                            </Row>
                        </form>
                    </Container>
                </div>
            </Layout >
        </>
    )
}

export default Register