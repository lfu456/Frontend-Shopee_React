import { Footer, RegisterHeader } from "../../components"

interface Props {
    children?: React.ReactNode
}
export function RegisterLayout({children}:Props){




    return(
        <div>
            <RegisterHeader />
            {children} 
            <Footer />
            {/* component vd: RegisterLayout(Login) */}
        </div>
    )
}