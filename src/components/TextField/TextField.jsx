import { func, string } from 'prop-types';
import { ClearBtn, InputWrapper, Input, Field } from './TextField.styled';
import { VscClose as IconClose } from 'react-icons/vsc';

export const TextField = ({ value, type, onChange, ...restProps }) => {
  return (
    <Field>
      <InputWrapper>
        <Input
          type={type || 'text'}
          onChange={onChange}
          value={value}
          {...restProps}
        />
        {value && (
          // NOTE: тут обязательно type="button", по-умолчанию ставит "submit"
          <ClearBtn type="button" onClick={() => onChange(null)}>
            <IconClose size="100%" />
          </ClearBtn>
        )}
      </InputWrapper>
    </Field>
  );
};

TextField.propTypes = {
  value: string,
  type: string,
  onChange: func,
};
