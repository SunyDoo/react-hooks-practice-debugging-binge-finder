import React from "react";

function TVShow(props) {

  function handleClick(e){
    e.preventDefault()
    props.selectShow(props.show)
  }

  return (
    <div>
      <br />
      <img src={props.show.image.medium} onClick={handleClick} alt="" />
    </div>
  );
}

export default TVShow;
