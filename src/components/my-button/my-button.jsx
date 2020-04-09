import React, { Component } from 'react'
import'./Mybutton.less';
export default class Mybutton extends Component {
    render() {
        return (
              <button className='my-button'{...this.props}/>
        )
    }
}
