import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { cookies } from 'next/headers'
import Categories from "./Categories";
import SearchBar from "./SearchBar";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar =  () => {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('token')
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href={"/"}
              className={`${redressed.className} font-bold text-2xl`}
            >
              E-Shop
            </Link>
            <div className="hidden md:block"><SearchBar/></div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount/>
             <UserMenu hasCookie={hasCookie}/> 
            </div>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
};
export async function getServerSideProps() {
  // Fetch data here and return it as props
  const currentUser = await getCurrentUser();
  return {
    props: {
      currentUser,
    },
  };
}


export default NavBar;