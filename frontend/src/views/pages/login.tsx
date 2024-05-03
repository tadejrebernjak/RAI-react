import { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

type FormData = {
    username: string;
    password: string;
};

type FormControl = {
    label: string;
    name: keyof FormData;
    type: "text" | "email" | "password";
    error: string | null;
    check: (data: FormData) => string | null;
};

export default function Login() {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
    });

    const [formControls, setFormControls] = useState<Array<FormControl>>([
        {
            label: "Username",
            name: "username",
            type: "text",
            error: null,
            check: (user) => {
                if (user.username.trim() === "") return "Field is empty!";
                return null;
            },
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            error: null,
            check: (user) => {
                if (user.password === "") return "Field is empty!";
                return null;
            },
        },
    ]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        formControl: FormControl
    ) => {
        const updatedFormData = {
            ...formData,
            [formControl.name]: e.target.value,
        };
        setFormData(updatedFormData);

        const newFormControl = formControl;
        newFormControl.error = formControl.check(updatedFormData);

        const index = formControls.findIndex(
            (control) => control.name === formControl.name
        );

        if (index !== -1) {
            const updatedFormControls = [...formControls];
            updatedFormControls[index] = newFormControl;
            setFormControls(updatedFormControls);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedFormControls = formControls.map((formControl) => ({
            ...formControl,
            error: formControl.check(formData),
        }));

        setFormControls(updatedFormControls);

        const hasError = updatedFormControls.some(
            (formControl) => formControl.error !== null
        );

        if (hasError) return;

        console.log("post", formData);
    };

    return (
        <div className="max-w-[400px] mx-auto">
            <h2 className="text-3xl text-center mb-10">Login</h2>

            <form onSubmit={handleSubmit}>
                {formControls.map((formControl) => (
                    <div key={formControl.name} className="mb-5">
                        <input
                            type={formControl.type}
                            name={formControl.name}
                            value={formData[formControl.name]}
                            placeholder={formControl.label}
                            onChange={(e) => handleChange(e, formControl)}
                            className={clsx(
                                "w-full bg-transparent outline-none border-b focus:border-sky-500 transition-colors py-1 text-lg",
                                !formControl.error && "border-gray-200",
                                formControl.error && "border-red-500"
                            )}
                        />
                        {formControl.error ? (
                            <p className="mt-1 text-red-500">
                                {formControl.error}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                ))}

                <input
                    type="submit"
                    value="Sign In"
                    className="w-full mt-5 py-2 bg-sky-700 hover:bg-sky-800 transition-colors cursor-pointer font-semibold uppercase"
                />
            </form>

            <hr className="mt-10 mb-5 border-gray-500" />

            <div className="text-center">
                <p>Don't have an account?</p>
                <Link
                    to={"/register"}
                    className="text-sky-500 hover:underline font-semibold"
                >
                    Sign up here
                </Link>
            </div>
        </div>
    );
}
