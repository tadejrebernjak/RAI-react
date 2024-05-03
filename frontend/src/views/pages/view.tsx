import { useParams } from "react-router-dom";

export default function View() {
    const { id } = useParams();

    return (
        <>
            <p>{id}</p>
        </>
    );
}
