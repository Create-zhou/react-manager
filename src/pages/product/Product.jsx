import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import AddUpdata from './AddUpdata'
import DetailProduct from './DetailProduct'
import HomeProduct from './HomeProduct'

/*
  /admin/product/AddUpdata    添加商品页面
  /admin/product/   展示所有商品页面

  /admin/product/AddUpdata 修改商品页面
  /admin/product/detail     商品详情页面
*/

export default class Product extends Component {
    render() {
        return (
            <div>
              <Switch>
                  <Route path='/admin/product/AddUpdata' component={AddUpdata}/>
                  <Route path='/admin/product' exact component={HomeProduct}/>
                  <Route path='/admin/product/DetailProduct' component={DetailProduct}/>
              </Switch>
            </div>
        );
    }
}