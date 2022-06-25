import React, { Component } from "react";

class Footer extends Component {

  render() {
    return (
      <footer style={{ backgroundColor: "#ffede7" }}>
        <div className="text-center p-3 text-white" style={{ backgroundColor: "rgba(33,37,41, 1)" }}>
          © 2022 Copyright
          <a className="text-white" href="#1"> Retail Shop Example</a>
        </div>
      </footer>
    )
  }
}

export default Footer;