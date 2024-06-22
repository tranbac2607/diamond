import { Formik, Form } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { ContactsOutlined, LockOutlined, MailOutlined, UnlockOutlined } from '@ant-design/icons';

import { RegisterType } from '@/models/auth';
import { EMAIL_REG_EXP, PHONE_REG_EXP } from '@/constant/auth';

import InputField from '../input-field/input-field';

import './register.scss';
import DiamondButton from '../common/button';

type Props = {
  onRegister: (values: RegisterType) => void;
};

const Register = ({ onRegister }: Props) => {
  const validate = Yup.object({
    email: Yup.string().matches(EMAIL_REG_EXP, 'Định dạng email sai').required('Bắt buộc'),
    customerName: Yup.string()
      .min(3, 'Tối thiểu 3 ký tự')
      .max(50, 'Tối đa 50 ký tự')
      .required('Bắt buộc'),
    password: Yup.string().min(8, 'Mật khẩu phải tối thiểu 8 ký tự').required('Bắt buộc'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Mật khẩu không khớp')
      .required('Bắt buộc'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        customerName: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => onRegister(values)}
    >
      {() => (
        <div className='d-flex justify-content-center'>
          <div className='form-container'>
            <div className='form__content'>
              <Form>
                <div className='form'>
                  <h1 className='my-4 font-weight-bold'>Đăng ký</h1>
                  <div className='form__field'>
                    <InputField
                      name='email'
                      type='email'
                      placeholder='Email'
                      prefix={<MailOutlined />}
                    />
                  </div>
                  <div className='form__field'>
                    <InputField
                      name='customerName'
                      type='text'
                      placeholder='Tên đầy đủ'
                      prefix={<ContactsOutlined />}
                    />
                  </div>
                  <div className='form__field'>
                    <InputField
                      name='password'
                      type='password'
                      placeholder='Mật khẩu'
                      prefix={<LockOutlined />}
                    />
                  </div>
                  <div className='form__field'>
                    <InputField
                      name='confirmPassword'
                      type='password'
                      placeholder='Xác nhận mật khẩu'
                      prefix={<UnlockOutlined />}
                    />
                  </div>
                  <div className='d-flex gap-4 button-register'>
                    <DiamondButton
                      content='Đăng ký'
                      width='120px'
                      size='large'
                      className='mt-2'
                      htmlType='submit'
                    />
                    <DiamondButton
                      content='Xóa'
                      type='default'
                      width='80px'
                      size='large'
                      className='mt-2'
                      htmlType='reset'
                    />
                  </div>

                  <div className='mt-4'>
                    <Link href='/login' style={{ color: '#000' }}>
                      Bạn đã có tài khoản?
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
            <div className='screen__background'>
              <span className='screen__background__shape screen__background__shape4'></span>
              <span className='screen__background__shape screen__background__shape3'></span>
              <span className='screen__background__shape screen__background__shape2'></span>
              <span className='screen__background__shape screen__background__shape1'></span>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Register;
