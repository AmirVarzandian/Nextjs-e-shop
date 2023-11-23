import getProducts from "@/actions/getProduct";
import Summary from "./Summary";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";

const Admin = async () => {
    const products = await getProducts({category: null})
    const users = await getUsers()
    return (
        <div className="pt-8">
            <Container>
           <Summary products={products} users={users} />
            </Container>
        </div>
    );
}
 
export default Admin;