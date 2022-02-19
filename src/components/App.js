import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
// import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");


  useEffect(() => {
    fetch("http://api.tvmaze.com/shows")
    .then(res => res.json())
    .then((shows) => setShows(shows));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleSearch(e) {
    setSearchTerm(e);
  }

  function handleFilter(e) {
    if (e.target.value === "No Filter"){
       setFilterByRating("")
    }else{ setFilterByRating(e.target.value)
    };
  }


  function selectShow(show) {
    // console.log(show)
    setSelectedShow(show);
    fetch(`http://api.tvmaze.com/shows/${show.id}/episodes`)
    .then(res => res.json())
    .then((episodes) => {
      setEpisodes(episodes);
    });
  }


  const showsToDisplay = shows.filter((show) => {
    if (searchTerm === "") {
      return true;
    } else {
      return show.name.toLowerCase().includes(searchTerm)
    }
    
  })

  return (
    <div>
      <Nav
        filterNumber={filterByRating}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        search={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              episodes={episodes}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={showsToDisplay.filter((show)=>{
              if (filterByRating){
                return show.rating.average >= filterByRating
              } else return showsToDisplay
            })}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
