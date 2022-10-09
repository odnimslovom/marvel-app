import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage/>
      <h2 style={
        {
          textAlign: 'center',
          margin: '30px auto',
          fontSize: '42px',
          color: '#9F0013',
        }
      }>ERROR 404!</h2>
      <p style={
        {
          textAlign: 'center',
          fontSize: '42px',
        }}>
        Page not found... Go to&#160;
        {
          <Link
            to={"/"}
            style={
              {
                borderBottom: '1px solid #9F0013',
                color: '#9F0013',
                cursor: 'pointer',
              }
            }>main</Link>}&#160;page
      </p>
    </div>
  )
}

export default Page404;
