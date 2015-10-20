module.exports = {
  testValue: "This is from the component file"
}



/*

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
      width: '200px',
      left: '40%',
      top: '300px',
    };

    return (
      <div style={containerStyle}>
        <a className="waves-effect waves-light btn-large">Login with Google</a>
      </div>
    );
  },

  _handleTouchTap() {
  },

});










// let DRINKS = [
//   { drinkName: 'maple syrup'},
//   { drinkName: 'blood of my enemies'},
//   { drinkName: 'Dihydrogen Monoxide'},
//   { drinkName: 'liquid cocaine'},
// ];

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

// var PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
// ];

// ReactDOM.render(
//     <FilterableProductTable products={PRODUCTS} />,
//     document.getElementById('container')
// );

module.exports = Main;

*/