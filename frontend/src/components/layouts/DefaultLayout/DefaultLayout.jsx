import Header from "../components/Header/Header";
function DefaultLayout({children}) {
    return (  
        <div className="content-center bg-white">
            <Header/>
            {children}
        </div>
    );
}

export default DefaultLayout;