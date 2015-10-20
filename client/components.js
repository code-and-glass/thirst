const React = require('react');


const Main = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      width: '80%',
      left: '10%',
      top: '100px',
    };

    return (
      <div>
        <Nav/>
        <LoginButton/>
        <BigCard/>
      </div>
    );
  },


  _handleTouchTap() {
  },

});



const Nav = React.createClass({    // Needs to collapse better for mobile
  render() {

    let containerStyle = {
      position: 'absolute',
      width: '94%',
      left: '3%',
      top: '20px',
      paddingLeft: '10px',
    };

    return (
      <nav style={containerStyle}>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Thirst</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="">Recommendations</a></li>
            <li><a href="">Rate Drinks</a></li>
            <li><a href="">Drinks I've Had</a></li>
          </ul>
        </div>
      </nav>
    );
  },

  _handleTouchTap() {
  },

});


const BigCard = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      width: '80%',
      left: '10%',
      top: '100px',
    };

    return (
      <div className="card" style={containerStyle}>
        <div className="card-image">
          <img src="http://cdn1.matadornetwork.com/blogs/1/2015/04/lion-photo.jpg"></img>
          <span className="card-title">Lion Drink</span>
        </div>
        <div className="card-content">
          <p>Here is a description of the drink itself</p>
        </div>
        <div className="card-action">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#" className="waves-effect waves-light btn">Next Drink</a>
        </div>
      </div>
    );
  },

  _handleTouchTap() {
  },

});



const LoginButton = React.createClass({
  render() {

    let containerStyle = {
      position: 'relative',
      // width: '200px',
      left: '40%',
      top: '300px',
    };

    return (
      <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>

    );
  },

  _handleTouchTap() {
  },

});


/*
// https://developers.google.com/identity/sign-in/web/sign-in
<script>
 function onSignIn(googleUser) {
   // Useful data for your client-side scripts:
   var profile = googleUser.getBasicProfile();
   console.log("ID: " + profile.getId()); // Don't send this directly to your server!
   console.log("Name: " + profile.getName());
   console.log("Image URL: " + profile.getImageUrl());
   console.log("Email: " + profile.getEmail());

   // The ID token you need to pass to your backend:
   var id_token = googleUser.getAuthResponse().id_token;
   console.log("ID Token: " + id_token);
 };
</script>
*/


module.exports = Main;




// let DRINKS = [
//   { drinkName: 'maple syrup'},
//   { drinkName: 'blood of my enemies'},
//   { drinkName: 'Dihydrogen Monoxide'},
//   { drinkName: 'liquid cocaine'},
// ];


// EXAMPLE OF DYNAMICALLY GENERATING NESTED COMPONENTS
// var ProductTable = React.createClass({
//     render: function() {
//         var rows = [];
//         var lastCategory = null;
//         this.props.products.forEach(function(product) {
//             if (product.category !== lastCategory) {
//                 rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
//             }
//             rows.push(<ProductRow product={product} key={product.name} />);
//             lastCategory = product.category;
//         });
//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>{rows}</tbody>
//             </table>
//         );
//     }
// });

// ReactDOM.render(
//     <FilterableProductTable products={PRODUCTS} />,
//     document.getElementById('container')
// );
