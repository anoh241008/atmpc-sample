export default function InlineAlert({type, message}){

    if(!message) return null;

    const styles = {

        success: "bg-green-100 text-green-700 border-green-300",
        error: "bg-red-100 text-red-700 border-red-300",
        warning: "bg-yellow-100 text-yellow-700 border-yello-300",

    };

    return (

        <div className={`p-2 mb-3 border rounded-md text-sm ${styles[type]}`}>
            {message}
        </div>

    )
}