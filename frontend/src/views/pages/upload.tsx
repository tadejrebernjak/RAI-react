import { useState } from "react";
import { UploadFormData } from "../../Types";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/postService";

type FormData = UploadFormData;

export default function Upload() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [formData, setFormData] = useState<FormData>({
        title: "",
        content: "",
        image: null,
    });
    const [imagePreview, setImagePreview] = useState<string | undefined>();

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFormData({
                ...formData,
                image: selectedFile,
            });

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            formData.title.trim() === "" ||
            formData.content.trim() === "" ||
            formData.image == null
        ) {
            setError("Please fill in all fields!");
            return;
        }

        const { error, data } = await createPost(formData);

        if (error) {
            setError(data);
            return;
        }

        navigate(`/view/${data._id}`);
    };

    return (
        <div className="max-w-[600px] mx-auto">
            <h2 className="text-3xl text-center mb-10">Login</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <input
                        required
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Title"
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-transparent outline-none border-b focus:border-sky-500 transition-colors py-1 text-lg"
                    />
                </div>

                {imagePreview && (
                    <div className="mb-5">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-[200px] mx-auto"
                        />
                    </div>
                )}

                <div className="mb-5">
                    <input
                        required
                        type="file"
                        name="image"
                        placeholder="Image"
                        onChange={(e) => handleChangeFile(e)}
                        className="w-full bg-transparent outline-none border-b focus:border-sky-500 transition-colors py-1 text-lg"
                        multiple={false}
                        accept="image/*"
                    />
                </div>

                <div className="mb-5">
                    <textarea
                        required
                        name="content"
                        rows={5}
                        value={formData.content}
                        placeholder="Post content..."
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-transparent outline-none border focus:border-sky-500 transition-colors p-2 text-lg"
                    />
                </div>

                <input
                    type="submit"
                    value="Sign In"
                    className="w-full mt-5 py-2 bg-sky-700 hover:bg-sky-800 transition-colors cursor-pointer font-semibold uppercase"
                />
            </form>

            <p className="text-center text-red-500 my-4">{error}</p>
        </div>
    );
}
