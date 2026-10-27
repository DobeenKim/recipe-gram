const ErrorMessage = ({error} : {error:string}) => {
    return (
        <div className="errorMsg">{error === "NEXT_REDIRECT" ? "" : error}</div>
    )
}

export default ErrorMessage