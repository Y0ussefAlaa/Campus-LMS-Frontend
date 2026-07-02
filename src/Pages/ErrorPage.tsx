import { NavLink } from "react-router-dom";
import Button from "../Components/ui/Button";

interface IProps {
  role: string;
}

const ErrorPage = ({role}: IProps) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center space-y-10">
      <h1 className="font-bold text-4xl">Can't Access This Route</h1>
      <NavLink to={`/${role}`}>
        <Button text="return to dashboard" className="px-8! py-4! text-lg!" />
      </NavLink>
    </div>
  );
};

export default ErrorPage;
