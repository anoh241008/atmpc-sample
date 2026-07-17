import React from 'react';
import MainPageNavbar from '../../../components/main/PublicNavbar/publicNavbar';
import MainPageFooter from '../../../components/main/PublicFooter/publicFooter';
const MainPublicLayout = ({children}) =>{
    return(
    <>
        <div className="min-h-screen flex flex-col">
            <MainPageNavbar/>
            <main className="flex-1">
                {
                children
                }
            </main>
            <MainPageFooter/>
        </div>
    </>
    )
}
export default MainPublicLayout;