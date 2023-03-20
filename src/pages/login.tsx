import { FormLogin } from '../components/form-login';
import { Warpper } from '../components/warpper';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default function Login() {
  return (
    <Warpper>
      <FormLogin />
    </Warpper>
  );
}
