import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';

function NewUsers() {
  return (
    <>
      <Heading as='h4'>
        <i>
          This functionality disabled for sample user while a portfolio item
        </i>
      </Heading>
      <Heading as='h1'>Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
