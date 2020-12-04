import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from './../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({location, history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    //get user form state
    const userRegister = useSelector(state => state.userRegister)
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userRegister
    
    //get redirect param
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    useEffect( () => {
        //if user is already authenticated, redirect
        if(userLogin.userInfo){
            history.push(redirect)
        }
    },[history, userLogin.userInfo, redirect])

    //sign in button
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmedPassword){
            setMessage('Password do not match')
        }else{
            dispatch(register(name, email, password))
        }
    }



    return ( 
        <FormContainer>
            <Row className='d-flex flex-column align-items-center'>
                <h1>Sign up</h1>
                <Image src="/logo.png" />
            </Row>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                
                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmedPassword'>
                    <Form.Label>
                        Confirm password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
     )
}
 
export default RegisterScreen;