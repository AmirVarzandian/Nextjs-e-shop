import { cookies } from "next/headers";
import Container from "../components/Container";
import CartClient from "./CartClient";

const Cart = () => {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('token')
  return <div className="pt-8">
    <Container>
      <CartClient hasCookie={hasCookie}/>
    </Container>
  </div>;
};

export default Cart;