import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: "Admin Dashboard",
    description: "E`Shop Admin Site"
}
const AdminLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className="">
        <AdminNav/>
        {children}
        </div>  
    );
}
 
export default AdminLayout;