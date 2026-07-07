export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={'label-premium ' + className}>
            {value || children}
        </label>
    );
}
