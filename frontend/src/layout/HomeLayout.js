import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function HomeLayout() {
    return (
        <div style={{height:"100vh" ,position:'relative'}}>
           <Header />
           <div style={{height: '77vh', margin: '16px 0',overflowY:'auto' }}>
                <Outlet />
            </div>
            <div style={{position:'absolute', bottom:'0',width:'100%'}}>
            <Footer />
            </div>
        </div>
    )
}

export default HomeLayout;