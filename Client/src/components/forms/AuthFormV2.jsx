import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LoginComponent from './AuthComponents/LoginComponent';
import RegisterComponent from './AuthComponents/RegisterComponent';
import ForgotComponent from './AuthComponents/ForgotComponent';
import ResetComponent from './AuthComponents/ResetComponent';

export default function AuthFormV2() {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const { type } = useParams();

    const renderAuthForm = () => {
        switch (type) {
            case 'login':
                return <LoginComponent />
            case 'register':
                return <RegisterComponent />
            case 'forgot-password':
                return <ForgotComponent />
            case 'reset-password':
                return <ResetComponent />
            default:
                break;
        }
    }

    return (
        <div className={`authForm-container ${isMobile ? "mobile" : ""} `}>

            <div className="form-banner">
                <img src="/images/dashboard/backgrounds/myAccount.jpg" alt="banner" />
            </div>
                
            {renderAuthForm()}

        </div >
    );
}