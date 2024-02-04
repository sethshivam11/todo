import React from "react";
import { UserContext, UserInterface } from "./UserContext";
import toast from "react-hot-toast";

function UserContextProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = React.useState<UserInterface>({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [loginModal, setLoginModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const fetchUser = async () => {
    if(!localStorage.getItem("todo-accessToken")){
      return console.log("Token not found");
    }
    setLoading(true);
    await fetch("/api/v1/users/get", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
        }
        if (!res.success) {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
    setLoading(false);
  };
  const updateDetails = (newDetails: UserInterface) => {
    if (!localStorage.getItem("todo-accessToken")) {
      return console.log("Token not found");
    }
    const { fullName, email, password } = newDetails;
    if (!fullName || !email || !password) return console.log("All fields are required");
    fetch("/api/v1/users/updateDetails", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify({ fullName, email, password }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          toast.success("Details updated");
        }
        if (!res.success) {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  };
  const updatePassword = async (oldPassword: string, newPassword: string) => {
    if (!localStorage.getItem("todo-accessToken")) {
      return console.log("Token not found");
    }
    if (!oldPassword || !newPassword) return console.log("All fields are required");
    await fetch("/api/v1/users/changePassword", {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          toast.success("Password updated");
        }
        if (!res.success) {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  };
  const updateAvatar = (avatar: string) => {
    if (!localStorage.getItem("todo-accessToken")) {
      return console.log("Token not found");
    }
    if(!avatar) return console.log("Avatar is required");
    fetch("/api/v1/users/updateAvatar", {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify({ avatar }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          return "Success";
        }
        if (!res.success) {
          return res.message;
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };
  const userLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (localStorage.getItem("todo-accessToken"))
      localStorage.removeItem("todo-accessToken");
    if(!email || !password) return console.log("All fields are required");
    fetch("/api/v1/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data.user);
          localStorage.setItem("todo-accessToken", res.data.accessToken);
          toast.success("Logged in successfully");
        }
        if (!res.success) {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };
  const userRegister = ({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    if (!localStorage.getItem("todo-accessToken"))
      localStorage.removeItem("todo-accessToken");
    if(!fullName || !email || !password) return console.log("All fields are required"); 
    fetch("/api/v1/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullName, password }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data.user);
          localStorage.setItem("todo-accessToken", res.data.accessToken);
          toast.success("Registered successfully");
        }
        if (!res.success) {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        user,
        loginModal,
        loading,
        setLoading,
        setLoginModal,
        setIsLoggedIn,
        setUser,
        fetchUser,
        updateDetails,
        updatePassword,
        updateAvatar,
        userLogin,
        userRegister,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;

export const useUser = () => {
  return React.useContext(UserContext);
};
