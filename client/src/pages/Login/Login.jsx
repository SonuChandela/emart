import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../../store/Features/userApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/Features/UserSlice'

function Login() {

    const dispatch = useDispatch();

    const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

    const [logInUser, setLogInUser] = useState(
        {
            email: '',
            password: ''
        }
    );

    // handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogInUser((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    // validate input



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login(logInUser).unwrap();
            console.log('Login successful:', result);
            // Handle successful login (e.g., redirect, update UI)

            dispatch(setUser(result.data.user));
            // reset form data 
            setLogInUser({
                email: '',
                password: ''
            })

        } catch (error) {
            console.error('Login failed:', error);

        }

    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const loggedInUser = await fetch('http://localhost:4545/api/user/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(logInUser),
    //     })

    //     if (!loggedInUser.ok) {
    //         throw new Error('Network response was not ok');
    //     }

    //     const data = await loggedInUser.json();
    //     console.log('Form submitted:', data);

    // }
    return (
        <>
            <Layout>
                <div className="login-page mt-100">
                    <Container>
                        <form action="#" className="login-form common-form mx-auto" onSubmit={handleSubmit}>
                            <div className="section-header mb-3">
                                <h2 className="section-heading text-center">Login</h2>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <fieldset>
                                        <label className="label">Email address</label>
                                        <input type="email" name="email" value={logInUser.email} onChange={handleChange} />
                                    </fieldset>
                                </div>
                                <div className="col-12">
                                    <fieldset>
                                        <label className="label">Password</label>
                                        <input type="password" name="password" value={logInUser.password} onChange={handleChange} />
                                    </fieldset>
                                </div>
                                <div className="col-12 mt-3">
                                    <a href="#" className="text_14 d-block">Forgot your password?</a>
                                    <button type="submit" className="btn-primary d-block mt-4 btn-signin">SIGN IN</button>
                                    <Link to="/register" className="btn-secondary mt-2 btn-signin">CREATE AN ACCOUNT</Link>
                                </div>
                            </div>
                        </form>
                    </Container>
                </div>
            </Layout>
        </>
    )
}

export default Login