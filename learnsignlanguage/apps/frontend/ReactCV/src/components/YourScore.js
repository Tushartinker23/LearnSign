// import "../App.css";
// import React, { useEffect } from 'react';
// import './css/areaOfExpertiesSection.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getScore } from "../redux/score";
// function YourScore() {
//   const dispatch = useDispatch();
//   const { currentScore: scores, loading, error } = useSelector((state) => state.score);
//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       dispatch(getScore(userId));
//     }
//   }, [dispatch]);

//   return (
//     <div className="container padding-class">
//       <div className="areaOfExpertiesSection">
//         {loading ? (
//           <div className="sarea">
//             <h2>Loading...</h2>
//           </div>
//         ) : error ? (
//           <div className="sarea">
//             <h2>Error</h2>
//             <p>{error}</p>
//           </div>
//         ) : scores && scores.length > 0 ? (
//           scores.map((item, index) => (
//             <div key={index} className="sarea">
//               <h2>{item.title}</h2>
//               <p>Date: {item.date}</p>
//               <p>Score: {item.score}</p>
//             </div>
//           ))
//         ) : (
//           <div className="sarea">
//             <h2>No Scores Available</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default YourScore;



// YourScore.jsx
import "../App.css";
import React from 'react';
import './css/areaOfExpertiesSection.css';

function YourScore({ currentScore }) {
  return (
    <div className="container padding-class">
      <div className="areaOfExpertiesSection">
        {currentScore && currentScore.length > 0 ? (
          currentScore.map((item, index) => (
            <div key={index} className="sarea">
              <h2>{item.title}</h2>
              <p>Date: {item.date}</p>
              <p>Score: {item.score}</p>
            </div>
          ))
        ) : (
          <div className="sarea">
            <h2>No Scores Available</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default YourScore;