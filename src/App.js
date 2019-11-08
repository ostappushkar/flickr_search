import React from 'react';
import './App.css';
import Flickr from'flickr-sdk';
class App extends React.Component {
  constructor(){
    super();
    this.state={
      searchString:"",
      photoItems:[]
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit(event){
    event.preventDefault();
    var flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);
    flickr.photos.search({text:this.state.searchString}).then((res)=>{
      this.setState({photoItems:res.body.photos.photo})
    })
  }
  handleTextChange(event){
    this.setState({ searchString: event.target.value });
  }
  render(){
  return (
    <div className="App">
        <header>
          <form onSubmit={this.handleSubmit}>
            <input type="search"       value={this.state.searchString} onChange={this.handleTextChange} name="searchText"></input>
            <input type="submit"  value="Search"></input>
          </form>
        </header>
        <section>
          <div className="photosContainer"> {this.state.photoItems.map((item,key)=>{
            return(
              <div id={key} className="photoItem">
                <img loading="lazy" alt="" src={ `http://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`}></img>
                <p>{item.title}</p>
              </div>
            )
          })}</div>
         

        </section>
    </div>
  );
}
}

export default App;
