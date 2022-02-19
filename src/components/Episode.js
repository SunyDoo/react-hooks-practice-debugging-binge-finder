import React from "react";

function Episode({ eachEpisode }) {

  return (
    <div>
      Episode {eachEpisode.number} - {eachEpisode.name}
    </div>
  );
}

export default Episode;
