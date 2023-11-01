import Header from "../components/Header/Header";
function DefaultLayout({children}) {
    return (  
        <div className="content-centerbg-white">
            <Header/>
            {children}
        </div>
    );
}

export default DefaultLayout;