import { ClipboardEvent, useEffect, useState } from 'react';
import './verify.scss';

const CODE_VERIFY_LENGTH = 6;
const KEYBOARDS = {
  backspace: 8,
  arrowLeft: 37,
  arrowRight: 39,
};

type Props = {
  emailVerify: string;
  isVerifyError: boolean;
  onSubmitVerify: (code: string) => void;
};

const Verify = ({ emailVerify, isVerifyError, onSubmitVerify }: Props) => {
  const [listValueInCodeVerify, setListValueInCodeVerify] = useState<string[]>([]);
  const [emailVerifyConvert, setEmailVerifyConvert] = useState<string>('');

  useEffect(() => {
    const initListValue: string[] = [];
    Array.from(Array(CODE_VERIFY_LENGTH).keys()).forEach((_) => {
      initListValue.push('');
    });
    setListValueInCodeVerify(initListValue);
  }, []);

  useEffect(() => {
    if (isVerifyError) {
      setListValueInCodeVerify((prev) => {
        return prev.map((item) => {
          item = '';
          return item;
        });
      });
    }
  }, [isVerifyError]);

  useEffect(() => {
    const [nameEmail, domainEmail] = emailVerify.split('@');
    const securityMail = `*****${nameEmail.slice(-3)}`;
    setEmailVerifyConvert(`${securityMail}@${domainEmail}`);
  }, [emailVerify]);

  useEffect(() => {
    const isSubmit = listValueInCodeVerify.every((item) => !!item);

    if (isSubmit && listValueInCodeVerify.length) {
      onSubmitVerify(listValueInCodeVerify.join(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listValueInCodeVerify]);

  const handleChange = (e: any, indexChange: number) => {
    const input = e.target;

    setListValueInCodeVerify((prev) => {
      return prev.map((item, index) => {
        if (index === indexChange) {
          item = input.value;
        }
        return item;
      });
    });

    const nextInput = input.nextElementSibling;
    if (nextInput && input.value) {
      nextInput.focus();
      if (nextInput.value) {
        nextInput.select();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();

    const paste = e.clipboardData.getData('text');
    if (!index) {
      setListValueInCodeVerify((prev) => {
        return prev.map((item, index) => {
          item = paste[index];
          return item;
        });
      });
    }
  };

  const handleBackspace = (e: { target: any }, indexChange: number) => {
    const input = e.target;
    if (input.value) {
      setListValueInCodeVerify((prev) => {
        return prev.map((item, index) => {
          if (index === indexChange) {
            item = '';
          }
          return item;
        });
      });
      return;
    }
    if (indexChange) {
      input.previousElementSibling.focus();
    }
  };

  const handleArrowLeft = (e: any) => {
    const previousInput = e.target.previousElementSibling;
    if (!previousInput) return;
    previousInput.focus();
  };

  const handleArrowRight = (e: any) => {
    const nextInput = e.target.nextElementSibling;
    if (!nextInput) return;
    nextInput.focus();
  };

  const handleKeydown = (e: any, index: number) => {
    switch (e.keyCode) {
      case KEYBOARDS.backspace:
        handleBackspace(e, index);
        break;
      case KEYBOARDS.arrowLeft:
        handleArrowLeft(e);
        break;
      case KEYBOARDS.arrowRight:
        handleArrowRight(e);
        break;
      default:
        break;
    }
  };

  return (
    <div className='container-vefiry'>
      <div className='form-container verify-form'>
        <div className='form__content d-flex align-items-center'>
          <form action='#'>
            <div className='verìy'>
              <div className='d-flex flex-column align-items-center justify-content-center'>
                <h3>OTP VERIFICATION</h3>
                <p className='info'>An OTP has been sent to</p>
                <p>{emailVerifyConvert}</p>
                <p className='msg'>Please enter OTP to verify</p>
              </div>
              <div className='d-flex mb-3'>
                {listValueInCodeVerify.map((item, index) => (
                  <input
                    key={index}
                    type='tel'
                    maxLength={1}
                    pattern='[0-9]'
                    className='form-control shadow-none'
                    value={item}
                    onChange={(e) => handleChange(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                    onKeyDown={(e) => handleKeydown(e, index)}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className='screen__background'>
          <span className='screen__background__shape screen__background__shape4'></span>
          <span className='screen__background__shape screen__background__shape3'></span>
          <span className='screen__background__shape screen__background__shape2'></span>
          <span className='screen__background__shape screen__background__shape1'></span>
        </div>
      </div>
    </div>
  );
};

export default Verify;
