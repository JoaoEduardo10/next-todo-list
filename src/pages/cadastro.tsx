import { GetServerSideProps, GetStaticProps } from 'next';
import { FormRegister } from '../components/form-register/form-register';
import { Warpper } from '../components/warpper';

export const getServerSideProp: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default function CreateUser() {
  return (
    <Warpper>
      <FormRegister />
    </Warpper>
  );
}
