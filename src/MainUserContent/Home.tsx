import React from 'react';
import { Link } from "react-router-dom";
import logo from './logo.svg';

// export interface HomeComponentProps { name: string }
// { params }: TParams

function Home() {
  return (
    <div className="App">
        <h3>Home</h3>
        <p>You are logged in!</p>
    </div>
  );
}

// const Home: React.FunctionComponent<HomeComponentProps> = (props) => {
//   return (
//     <div className="App">
//         <h3>Home</h3>
//         <p>You are logged in as {props.name}!</p>
//     </div>
//   );
// }

export default Home;
