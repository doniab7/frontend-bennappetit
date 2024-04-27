import React from 'react';
import { Link } from 'react-router-dom';
import "./Category.scss";

const CategoryList = ({categories}) => {
  return (
    <div className='section-wrapper bg-whitesmoke'>
        <div className='container'>
          <div className='sc-title'>categories</div>
          <section className='sc-category grid'>
            {
              categories.map(category => {
                const { id, name, thumbnail} = category;

                return (
                  <Link to = {`/meal/category/${name}`} className = "category-itm align-center justify-center" key = {id}>
                    <div className='category-itm-img h-100 w-100 flex align-center justify-center'>
                      <img src = {thumbnail} alt = {name} />
                      <div className='category-itm-title bg-orange'>
                        <h3 className='text-white fs-11 fw-6 ls-1 text-uppercase'>{name}</h3>
                      </div>
                    </div>
                  </Link>
                )
              })
            }
          </section>
        </div>
    </div>
  )
}

export default CategoryList