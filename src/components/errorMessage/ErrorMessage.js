import errorImg from './error.png';

const ErrorMessage = () => {

  const style = {
    display: 'block',
    width: '250px',
    margin: '0 auto',
  }

  return (
    <img src={errorImg}
         style={style}
         alt="Error message" />
  );
}

export default ErrorMessage;
