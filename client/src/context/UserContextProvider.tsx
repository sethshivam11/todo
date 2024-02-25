import React from "react";
import { UserContext, UserInterface } from "./UserContext";
import toast from "react-hot-toast";
import { useTodo } from "./TodoContextProvider";

function UserContextProvider(props: React.PropsWithChildren<{}>) {
  const { fetchTodos } = useTodo();
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
    if (!localStorage.getItem("todo-accessToken")) {
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
    if (!fullName || !email || !password)
      return console.log("All fields are required");
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
    if (!oldPassword || !newPassword)
      return console.log("All fields are required");
    await fetch("/api/v1/users/changePassword", {
      method: "PATCH",
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
  const updateAvatar = async (file: File) => {
    if (!localStorage.getItem("todo-accessToken")) {
      return console.log("Token not found");
    }
    if (!file) return console.log("Please provide a file");
    const toastLoading = toast.loading("Uploading file...");

    // Upload to cloudinary
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "todoapp");
    fetch(`https://api.cloudinary.com/v1_1/dv3qbj0bn/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        const avatar = res.secure_url;
        if (!avatar) {
          toast.error("Something went wrong!", {
            id: toastLoading,
          });
          return console.log("Avatar is required");
        }
        // Save it to backend
        fetch("/api/v1/users/updateAvatar", {
          method: "PATCH",
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
              toast.success("Profile picture updated", {
                id: toastLoading,
              });
            } else if (!res.success) {
              toast.error(res.message, {
                id: toastLoading,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong!", {
              id: toastLoading,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!", {
          id: toastLoading,
        });
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
    if (!email || !password) return console.log("All fields are required");
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
          fetchTodos();
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
    if (!fullName || !email || !password)
      return console.log("All fields are required");
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
          fetchTodos();
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
  const removeAvatar = () => {
    if (!localStorage.getItem("todo-accessToken")) {
      return console.log("Token not found");
    }
    const toastLoading = toast.loading("Removing avatar...");
    fetch("/api/v1/users/removeAvatar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("todo-accessToken")}`,
      },
    })
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          toast.success("Avatar removed", {
            id: toastLoading,
          });
          setUser({ ...user, avatar: res.data.avatar });
        } else if (!res.success) {
          toast.error(res.message, {
            id: toastLoading,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!", {
          id: toastLoading,
        });
      });
  }

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
        removeAvatar
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
