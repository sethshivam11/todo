// import { Dialog, DialogTitle, DialogContent } from "@radix-ui/react-dialog";
// import { Button } from "./ui/button";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "./ui/input";
// import { FormEvent, useState } from "react";
// import { DialogHeader } from "./ui/dialog";


// const CreateTodo = () => {
//   const [todo, setTodo] = useState({
//     title: "",
//     content: "",
//     completed: false,
//   });
//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     console.log(todo);
//   };

//   const handleChange = (e: Event) => {
//     const input = e.target as HTMLInputElement
//     setTodo({...todo, [input.name]: input.value})
//   }
//   return (
//     <Dialog open={}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Create a Task</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={}>
//           <Label htmlFor="login-email">Email</Label>
//           <Input
//             name="title"
//             id="login-email"
//             type="text"
//             className="my-1"
//             value={todo.title}
//             onChange={handleChange}
//           />
//           <Label htmlFor="login-password">Password</Label>
//           <Input
//             name="password"
//             id="login-password"
//             type={showPassword ? "text" : "password"}
//             className="my-1"
//             value={todo.content}
//             onChange={handleChange}
//           />
//           <div className="my-2">
//             <Checkbox id="show" asChild />
//             <Label htmlFor="show">Show Password</Label>
//           </div>
//           <Button type="submit" className="mt-4">
//             Login
//           </Button>
//           <Button variant="outline" className="ml-2" onClick={() => {}}>
//             Register
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateTodo;
