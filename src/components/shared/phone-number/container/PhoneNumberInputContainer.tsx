import PhoneNumberInput from "../components/PhoneNumberInput";
import { sanitizePhoneDigits } from "../phone-number.utils";

type PhoneNumberInputContainerProps = React.ComponentProps<typeof PhoneNumberInput>;

const PhoneNumberInputContainer = ({
  onChange,
  ...props
}: PhoneNumberInputContainerProps) => (
  <PhoneNumberInput
    {...props}
    onChange={(value) => onChange(sanitizePhoneDigits(value))}
  />
);

export default PhoneNumberInputContainer;
