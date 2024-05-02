import { useState } from "react";

type UserForm = {
    email: string;
    username: string;
    password: string;
    passwordRepeat: string;
};

export default function Register() {
    const [user, setUser] = useState<UserForm>({
        email: "",
        username: "",
        password: "",
        passwordRepeat: "",
    });

    const inputType = (field: string): string => {
        if (field === "passwordRepeat") return "password";
        else if (field === "username") return "text";

        return field;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof UserForm
    ) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: e.target.value,
        }));
    };

    return (
        <div>
            <h2>Register</h2>
            <form>
                <div>
                    <label>E-Mail</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => handleChange(e, "email")}
                    />
                </div>

                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={(e) => handleChange(e, "username")}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => handleChange(e, "password")}
                    />
                </div>

                <div>
                    <label>Repeat password</label>
                    <input
                        type="password"
                        name="passwordRepeat"
                        id="passwordRepeat"
                        value={user.passwordRepeat}
                        onChange={(e) => handleChange(e, "passwordRepeat")}
                    />
                </div>

                <input type="submit" value={"Register"} />
            </form>
        </div>
    );
}
