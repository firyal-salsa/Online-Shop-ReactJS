import "./style/style.scoped.css";
import React, { useState, useEffect } from "react";
import Cards from "../../components/cards";
import axios from "axios";
import Logo from "../../components/logo";
import Navbar from "../../components/navbar";
import NavbarAuth from "../../components/navbaricons";
import CarouselNews from "../../components/carouselnews";
import CarouselCategory from "../../components/carouselcategory";
import { useHistory } from "react-router";
import { useSelector } from 'react-redux';
import Select from "react-select";

const options = [
  { label: 'Harga',value: `${process.env.REACT_APP_API}/product/produk_harga` },
  { label: 'Nama pakaian',value: `${process.env.REACT_APP_API}/product/produk_nama` },
  { label: 'Terbaru',value: `${process.env.REACT_APP_API}/product` }
];

function Home() {
  const [allData, setAllData] = useState([]);
  const [category, setcategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredData, setFilteredData] = useState(allData);
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.users)
 
  const initialFormState = `${process.env.REACT_APP_API}/product`

  const [url, seturl] = useState(initialFormState);

  const updateForm = (value, kategori_id) => {
    seturl({ ...url, mySelectKey: value });
    filteredData.filter(filteredData => filteredData.produk_kategori_id === filteredCategory)
  };


  useEffect(() => {
    axios(
      url.mySelectKey || initialFormState
      )
      .then((response) => {
        setAllData(response.data.result);
        setFilteredData(response.data.result);
        const arr = response.data.result
        arr.filter(arr => arr.produk_kategori_id === 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url.mySelectKey, initialFormState]);

  useEffect(() => {
    axios(
      `${process.env.REACT_APP_API}/category`
      )
      .then((response) => {
        setcategory(response.data.result)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const [state, setState] = useState([])

  const handleBtns = (e) => {
    setFilteredCategory(e.target.value)
    let word=e.target.value
    if(word === 'All'){
      setState(filteredData)
    }else if(word === 5){
      
      const filter = filteredData.filter(item=>item.produk_kategori_id === 5);
      console.log(filteredData.produk_kategori_id)
      setState(filter)
    }else{
      console.log('salah')
      console.log(typeof filteredData)
      console.log(console.log(Object.values(filteredData)))
    }
    
  }

  const handleDetail = (produk_nama) => {
    history.push(`/products/${produk_nama}`);
  }

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    result = allData.filter((data) => {
      return data.produk_nama.search(value) !== -1;
    });
    setFilteredData(result);
  };
  

  return (
    <body className="home-body">
      <nav className="header-navbar d-flex justify-content-around">
        <div
          className="header-logo-nav navbar-brand p-2 flex-grow-1"
        >
          <Logo />
        </div>
        
        <div className="header-search">
          <div id="d-flex" className="search-filter">
            <div className="input-group">
              <input
                className="search-input w-search p-2 rounded-pill"
                placeholder="Search"
                onChange={(event) => handleSearch(event)}
              />
              <span className="input-group-append">
                <button
                  id="search-border"
                  className="btn btn-outline-secondary search-icon"
                  type="button"
                >
                  <i className="bi-search" />
                </button>
              </span>
              <button
                className="btn btn-outline-secondary rounded funnel"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="bi-funnel" />
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Setting
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                  <div className="modal-body">
                  <form>
                    Sort by :
                  <Select
                    name={({ label }) => label}
                    value={options.filter(({ value }) => value === url.mySelectKey)}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={({ value }) => updateForm(value)}
                    options={options}
                  />
                  <br /> <br /> <br /> <br />
                  </form>
                  </div>
                  <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="header-navbar-home">
          {!isAuth ? <Navbar /> : <NavbarAuth />}
        </div>
      </nav>
      <div className="container pt-5 mx-5">
        <CarouselNews />
        <CarouselCategory />
        <main>
          <section>
            <h3 className="font-weight-bold">New</h3>
            <p className="text-secondary">You’ve never seen it before!</p>
            <section className="cards mx-5">
              {state.map((value, index) => {
                return (
                  <Cards
                  produk_nama={value.produk_nama}
                  produk_harga={value.produk_harga}
                  produk_foto={value.produk_foto}
                  produk_terjual={value.produk_terjual}
                  produk_toko={value.produk_toko}
                  goDetail={handleDetail}
                />
                );
              })}
            </section>
          </section>
          <section>
            <h3 className="font-weight-bold">Popular</h3>
            <p className="text-secondary">
              Find clothes that are trending recently
            </p>
            <section className="cards mx-5">
            {filteredData.map((value, index) => {
                return (
                  <Cards
                  produk_nama={value.produk_nama}
                  produk_harga={value.produk_harga}
                  produk_foto={value.produk_foto}
                  produk_terjual={value.produk_terjual}
                  produk_toko={value.produk_toko}
                  goDetail={handleDetail}
                />
                );
              })}
            </section>
          </section>
        </main>
      </div>
    </body>
  );
}

export default Home;
