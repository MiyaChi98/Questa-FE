import { FieldValues, UseFormRegister } from 'react-hook-form';

// Custom components
function InputField(props: {
  id: string;
  label: string;
  label_color?: string;
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
  pattern?: {
    rule: string,
    pattern: RegExp
  };
}) {
  const {
    label,
    label_color,
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
        className={` ${label_color? `text-${label_color}-900`:'text-white'} ${
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
        className={`mt-1 mb-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 outline-none ${label_color? `text-${label_color}-900`:'text-white'}`}
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
            value:  pattern.pattern,
            message: `${pattern.rule}`,
          },
        })}
      />
    </div>
  );
}

export default InputField;
