import React,{useState} from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {googleSignInStart,emailSignInStart} from  '../../redux/user/user.actions'
import {connect} from 'react-redux'
const SignIn = ({emailSignInStart,googleSignInStart}) => {
        const [userCredentials,setCredentials] = useState({email:'',password:''})
        const {email,password} = userCredentials
        const handleSubmit = async event => {
            event.preventDefault();
            emailSignInStart(email,password);
            // try {
            //     await auth.signInWithEmailAndPassword(email,password);
            //     this.setState({email:'',password:''})
            // } catch (error) {
            //     console.log(error)
            // }
        }
        const handleChange = event => {
            const {value,name} = event.target;
            setCredentials({...userCredentials,[name]: value})
        }
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                    type="email" 
                    name="email" 
                    value={email} 
                    required 
                    handleChange={handleChange}
                    label='Email'
                    />
                    <FormInput 
                    type="password" 
                    name="password" 
                    value={password} 
                    required
                    label="Password"
                    handleChange={handleChange}
                    />
                    <div className="buttons"> 
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
                            {' '}
                            Sign in With Google{' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
}
const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email,password) => dispatch(emailSignInStart({email,password}))
})
export default connect(null,mapDispatchToProps)(SignIn);