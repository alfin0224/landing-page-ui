import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; 

const GameDetail = () => {
  const [activeItemId, setActiveItemId] = useState(null);
  const handleItemClick = (itemId) => {
    setActiveItemId(itemId);
  };

  const [userId, setUserId] = useState('');
  const {id} = useParams();
  const [title, setTitle] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [description, setDescription] = useState();
  const [topUpAmounts, setTopUpAmounts] =useState([]);

  useEffect(() => {
    const fetchGameCatalogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/game-catalogs/${id}`);
        setTitle(response.data.title);
        setImageUrl(response.data.imageUrl);
        setDescription(response.data.description);

      } catch (error) {
        console.error('Error fetching game catalogs:', error);
      }
    }; 

    fetchGameCatalogs();
  }, []);

  useEffect(() => {
    const fetchTopUpAmounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/top-up-amounts/game-catalog/${id}`);
        setTopUpAmounts(response.data);
      } catch (error) {
        console.error('Error fetching game catalogs:', error);
      }
    }; 

    fetchTopUpAmounts();
  }, []);

  const handleSearch = async (e) => {
    const searchData = {
      userId: userId
    }
    // console.log(searchData);
    try {
      e.preventDefault();



      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      console.log(userId);
      const encodedUserId = encodeURIComponent(userId);
      const responseUser = await axios.get(`http://localhost:8000/users/search?userId=${encodedUserId}`);
        setUserId(responseUser.data.userId);
        // console.log(responseUser);
        Swal.fire({  
          title: 'Success!',  
          type: 'success',  
          text: `User found: ${responseUser.data.name}`,  
        }); 
    } catch (error) {
      Swal.fire({  
        title: 'Failed!',  
        type: 'error',
        text: `User not found!.`,
      }); 
    }
  };

  return (
    <div className="text-white pt-14 md:pt-16 min-h-screen" style={{ background: "rgb(50, 50, 62)" }}>
      <div className="mx-auto max-w-7xl px-4 pb-[2rem] sm:pb-[0.5rem] md:pb-[1rem] lg:pb-[3.5rem] sm:px-6 lg:px-14 pt-5">
        <a href="/">
        <button className="bg-transparent my-5 hover:bg-purple-300 text-gray-400 font-semibold hover:text-white py-2 px-4 border border-purple-600 hover:border-transparent rounded">
          Back
        </button>
        </a>
        <div className="relative">
          <div className="rounded-lg absolute inset-0 max-h-[10rem] sm:max-h-[12.5rem] md:max-h-[13.5rem] lg:max-h-[15.7rem]">
            <div>
            <header className="relative h-full w-full ">
              <img
                src="https://picsum.photos/1200/258?random=1"
                className="object-cover rounded-lg h-[10rem] sm:h-[12.5rem] md:h-[13.5rem] lg:h-[15.7rem] shadow-2xl shadow-gray-300/20"
              />
            </header>
            </div>
            <div
              className="absolute inset-0 bg-gray-300 mix-blend-multiply rounded-lg"
              aria-hidden="true"
            ></div>
          </div>
          <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8 "></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-9">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-14">
          <div className="grid grid-cols-1 gap-y-4 sm:gap-x-0 lg:gap-x-4 lg:grid-cols-3">
            <div>
              <article
                className="relative flex-1 rounded-xl px-6 pt-12 pb-8 sm:rounded-lg lg:block lg:pt-24 shadow-2xl shadow-gray-300/20"
                style={{ background: "rgb(39, 39, 48)" }}
              >
                <div className="absolute top-0 z-20 m-auto inline-block h-auto w-auto -translate-y-1/2 rounded-3xl p-2">
                  <img
                    alt={title}
                    src={imageUrl}
                    width="500"
                    height="500"
                    className="m-auto h-24 w-24 rounded-2xl object-cover lg:h-[170px] lg:w-[170px]"
                    loading="lazy"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="py-5">
                  <h3 className="text-lg font-extrabold leading-6 md:text-xl">
                    {title}
                  </h3>
                </div>
                <div>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <dd className="mt-1 text-sm">
                        <div>
                          <p>
                            {description}
                          </p>
                          <p className="p2">
                            <br />
                          </p>
                          <p className="p1">
                            Bayarlah menggunakan QRIS, GoPay, OVO, DANA, Bank
                            Transfer, Telkomsel, ShopeePay, LinkAja, Alfamart,
                            Indomaret dan kartu kredit. Tanpa perlu registrasi
                            ataupun log-in.
                          </p>
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </div>
            <div className="col-span-2 space-y-4">
              <section
                id="order-information"
                className="rounded-[8px] py-5 px-6 shadow-2xl shadow-gray-300/20"
                style={{ background: "rgb(39, 39, 48)" }}
              >
                <div className="mt-2 flex w-full content-center space-x-2 border-b pb-2 items-center">
                  <h3 className="flex items-center space-x-2 pb-2 text-lg font-extrabold leading-6 md:text-xl">
                    <img
                      alt="number-one"
                      src="https://img.icons8.com/nolan/64/1.png"
                      width="26"
                      height="26"
                      loading="lazy"
                      style={{ color: "transparent" }}
                    />
                    <span>Masukkan User ID</span>
                  </h3>
                </div>
                <div className="mt-4 grid gap-1 grid-cols-5 sm:grid-cols-5 lg:grid-cols-5">
                  <div className="col-span-4">
                    <div className="relative rounded-md text-black shadow-sm">
                      <input
                        className="block w-full rounded-full border-gray-300 text-sm shadow-sm sm:text-sm focus:outline-none focus:border-[#2D2EAD] focus:ring-2 focus:ring-[#2D2EAD] py-[0.5rem] px-[0.75rem]"
                        name="userId"
                        placeholder="USER ID"
                        type="text"
                        value={userId} 
                        onChange={e => setUserId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="relative rounded-sm text-black shadow-sm">
                      <button onClick={handleSearch} className="bg-gray-300 block w-1/8 rounded-3xl shadow-sm focus:outline-none focus:border-[#2D2EAD] focus:ring-2 focus:ring-[#2D2EAD] py-[0.5rem] px-[0.75rem] hover:bg-purple-200">
                        <img src="https://img.icons8.com/nolan/64/search.png" width="22" height="22"></img>
                        </button> 
                    </div>
                  </div>
                </div>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "rgb(203, 203, 203)" }}
                >
                  Untuk menemukan ID Riot Anda. Contoh: Westbourne#SEA
                </p>
              </section>
              <section
                className="rounded-[8px] py-5 px-6 shadow-2xl shadow-gray-300/20"
                style={{ background: "rgb(39, 39, 48)" }}
              >
                <div className="mt-2 flex w-full content-center space-x-2 border-b pb-2 items-center">
                  <h3 className="flex items-center space-x-2 pb-2 text-lg font-extrabold leading-6 md:text-xl">
                    <img
                      alt="number-two"
                      src="https://img.icons8.com/nolan/64/2.png"
                      width="26"
                      height="26"
                      loading="lazy"
                      style={{ color: "transparent" }}
                    />
                    <span>Pilih Item</span>
                  </h3>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3" >
                  {topUpAmounts.map((item) => (
                    <article
                      className="relative rounded-lg group"
                      style={{ background: "rgb(50, 50, 62)" }}
                      key={item.id}
                    >
                      <div className={
                        `flex h-full cursor-pointer items-center justify-between rounded-xl p-4 py-2 css-0 hover:bg-violet-600 active:bg-violet-700 ${ activeItemId === item.id ? "outline-none ring ring-violet-600" : "" }`}
                        onClick={() => handleItemClick(item.id)}>
                        {activeItemId && activeItemId === item.id && (
                        <div className="absolute right-0 top-0 rounded-bl-full p-1 pl-2 rounded-tr-[3000px] pb-2 bg-violet-600">
                        <img
                            alt="icon-active"
                            height="15"
                            width="15"
                            src="https://img.icons8.com/nolan/64/double-tick.png"
                          />
                        </div>
                        )}
                        <div className="mr-3">
                          <div className="flex h-full items-center">
                            <div>
                              <h4 className="text-[13px] font-semibold">
                                {item.points + " Tokens"}
                              </h4>
                            </div>
                          </div>
                          <div className="">
                            <h5 className="text-[12px] mt-2 font-light">
                              Rp {item.price.toLocaleString("id-ID")},-
                            </h5>
                          </div>
                        </div>
                        <div className="relative items-end h-[24px] w-[24px] p-1 mt-4">
                          <img
                            alt="icon-item"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src="https://img.icons8.com/ios-filled/50/diamond--v1.png"
                            style={{
                              position: "absolute",
                              height: "100%",
                              width: "100%",
                              inset: "0px",
                              color: "transparent",
                            }}
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
