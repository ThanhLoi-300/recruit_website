import Header from "../components/Header/Header";
function DefaultLayout({children}) {
    return (  
        <div className="bg-white">
            <Header/>
            {children}
        </div>
    );
}

export default DefaultLayout;