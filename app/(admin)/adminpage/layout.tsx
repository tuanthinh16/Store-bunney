import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/app.header';



export default function Adminlayout({children}: {children: React.ReactNode}) {
    return (
    // <html lang="en">
    //     <body>
            <div>
                <Header/>
                <div style={{marginLeft:'3rem'}}>
                    {children}
                </div>
            </div>
    //     </body>
    // </html>
    )
}