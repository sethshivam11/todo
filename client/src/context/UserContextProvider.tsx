import React from "react";
import { UserContext, UserInterface } from "./UserContext";

function UserContextProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = React.useState<UserInterface>({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const fetchUser = () => {
    if (!localStorage.getItem("todo-accessToken")) return "No token";
    fetch("/api/v1/users/get", {
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
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };
  const updateDetails = (newDetails: UserInterface) => {
    if (!localStorage.getItem("todo-accessToken")) return "No token";
    fetch("/api/v1/users/updateDetails", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
        body: JSON.stringify({
          fullName: newDetails.fullName,
          email: newDetails.email,
          password: newDetails.password,
        }),
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };
  const updatePassword = (oldPassword: string, newPassword: string) => {
    if (!localStorage.getItem("todo-accessToken")) return "No token";
    fetch("/api/v1/users/updatePassword", {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };
  const updateAvatar = (avatar: string) => {
    if (!localStorage.getItem("todo-accessToken")) return "No token";
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
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };
  const userLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!localStorage.getItem("todo-accessToken"))
      localStorage.removeItem("todo-accessToken");
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
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
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
    fetch("/api/v1/users/get", {
      method: "get",
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
          return "Success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "Error";
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
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
