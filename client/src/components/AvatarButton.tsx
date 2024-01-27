import { Button } from "./ui/button";
import avatar from "../assets/avatar2.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

const AvatarButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="pointer-cursor">
        <Button
          size="icon"
          className="absolute bottom-0 lg:top-0 xl:top-0 2xl:top-0 md:top-0 mt-8 right-20 overflow-hidden rounded-full hover:ring-2 dark:hover:ring-white hover:ring-slate-950"
        >
          <img src={avatar} alt="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="ring-1 ring-gray-200 dark:ring-slate-200 p-2 rounded-md mt-2">
        <DropdownMenuItem
          className="px-4 py-2 cursor-default text-center"
          onClick={() => (window.location.href = "/profile")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="px-4 py-2 cursor-default text-center"
          onClick={() => {
            localStorage.removeItem("todo-accessToken");
            window.location.reload();
          }}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarButton;
