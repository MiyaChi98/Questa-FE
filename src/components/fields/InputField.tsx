import { FieldValues, UseFormRegister } from 'react-hook-form';

// Custom components
function InputField(props: {
  id: string;
  label: string;
  extra?: string;
  placeholder: string;
  variant?: string;
  state?: string;
  disabled?: boolean;
  defaultValue?:string;
  type?: string;
  name: string;
  require: boolean;
  register: UseFormRegister<FieldValues>;
  maxLength: number;
  minLength: number;
  pattern: {
    rule: string,
    pattern: RegExp
  };
}) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    name,
    defaultValue,
    require,
    register,
    maxLength,
    minLength,
    pattern,
  } = props;

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 text-white ${
          variant === 'auth' ? 'ml-1.5 font-medium' : 'ml-3 font-bold'
        }`}
      >
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 outline-none ${
          disabled === true
            ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
            : state === 'error'
            ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
            : state === 'success'
            ? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
            : 'border-gray-200 dark:!border-white/10 dark:text-white'
        }`}
        {...register(name, {
          required: require,
          maxLength: {
            value: maxLength,
            message: `Max length of this field is ${maxLength}`,
          },
          minLength: {
            value: minLength,
            message: `Max length of this field is ${minLength}`,
          },
          pattern: {
            value: pattern.pattern,
            message: `${pattern.rule}`,
          },
        })}
      />
    </div>
  );
}

export default InputField;
