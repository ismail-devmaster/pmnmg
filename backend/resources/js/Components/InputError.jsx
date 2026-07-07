export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-red-400 mt-2 ' + className}>
            {message}
        </p>
    ) : null;
}
