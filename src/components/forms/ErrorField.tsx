const ErrorField = ({msg}: {msg?:string}) => (
    <span className="min-h-4 text-red-400 text-xs m-1">
        {msg ?? ''}
    </span>
);
export default ErrorField;