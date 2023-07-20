import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { clearDetail, getCarById } from "../../redux/actions";
import NavBar from "../navbar/NavBar";
import style from "./Detail.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const car = useSelector((state) => state.carDetail);
  const [reviews, setReviews] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [newReview, setNewReview] = useState({
    id_user: null,
    id_car: null,
    coment: "",
    value: 5,
  });
  const [showModal, setShowModal] = useState(false);
  const stars = [1, 2, 3, 4, 5];
  const { idCategory, idMarca } = car;
  const dispatch = useDispatch();

  const getReview = async (id_car) => {
    const { data } = await axios.get(`/reviews/getReview/${id_car}`);
    setReviews(data);
  };


  useEffect(() => {
    getReview(id);
    dispatch(getCarById(id));
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  const [loading, setLoading] = useState(true);


  const showModalReview = () => {
    setNewReview({
      id_user: userDetails._id,
      id_car: car._id,
      coment: "",
      value: 5,
    });
    setShowModal(true);
  };
  const handlerNewReview = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };
  const closeModalReview = () => {
    setShowModal(false);
    setNewReview({
      id_user: null,
      id_car: null,
      coment: "",
      value: 5,
    });
  };

  const showPopup = () => {
    Swal.fire({
      text: "Car added to cart",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
      icon: "success",
    });
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true); 

        await getReview(id); 
        dispatch(getCarById(id));

        setLoading(false); 
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false); 
      }
    };

    fetchCarDetails();

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    const item = {
      id: car.id,
      amount: 1,
      name: car.name,
      price: car.price,
      totalPrice: car.price,
      image: car.image,
    };
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.amount += 1;
      existingItem.totalPrice = existingItem.price * existingItem.amount;
    } else {
      cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    showPopup();
  };
  const handlerSubmitReview = async () => {
    try {
      const { data } = await axios.post("/reviews", newReview);
      if (data.data) {
        setReviews([...reviews, data.data]);
        Swal.fire({
          icon: "success",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 600,
        });
        closeModalReview();
      } else {
        Swal.fire({
          icon: "error",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getReview(id);
    dispatch(getCarById(id));
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    let postData = {};
    if (user) {
      postData = {
        user: user,
      };
    } else if (admin) {
      postData = {
        user: admin,
      };
    }

    if (user || admin) {
      axios
        .post("https://pf-back.fly.dev/user/verifyUser", postData)
        .then((response) => {
          if (response.status === 202 && response.data) {
            setUserDetails(response.data.data);
          } else {
            console.error("Error getting user account details");
          }
        })
        .catch((error) => {
          console.error("Error making the request:", error);
        });
    } else {
      console.error("No user found in localStorage");
    }
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  return (
    <>
      <div>
        <NavBar />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loading ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
          ) : (
        <div className={style.container}>
          <div>
            <img src={car?.image} alt="" />
          </div>
          <div className={style.detalles}>
            <div className={style.caracteristicas}>
              <h2>{car?.name}</h2>
              <h4>
                <strong>USD $</strong>${car?.price}
              </h4>
              <p>
                {" "}
                <strong>Year: </strong>
                {car?.age}
              </p>
              <p>
                <strong>Color: </strong> {car?.color}
              </p>
              <p>
                <strong>Trasmission: </strong> {car?.transmission}
              </p>
              <p>
                <strong>Brand: </strong> {idMarca?.name}
              </p>
              <p>
                <strong>Category: </strong> {idCategory?.name}
              </p>
            </div>
            <div className={style.buttons}>
              <button className={style.buttones} onClick={handleAddToCart}>
                Add To Cart
              </button>
              <button className={style.buttones} onClick={showModalReview}>
                Add Review
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
      <dialog
        id="my_modal_3"
        className={showModal ? "modal modal-open" : "modal"}
      >
        <form
          method="dialog"
          className="modal-box w-11/12 w-5xl h-auto"
          onSubmit={handlerSubmitReview}
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={closeModalReview}
          >
            X
          </button>
          <h3 className="font-bold text-lg text-gray-300">Public Review</h3>
          <div className="pb-12">
            <div className="mt-10 flex flex-col">
              <div className="sm:col-span-6 text-center	">
                <div className="rating rating-lg">
                  {stars.map((star) => {
                    return (
                      <input
                        key={star}
                        type="radio"
                        value={star}
                        onChange={handlerNewReview}
                        name="value"
                        className="mask mask-star-2 bg-orange-400"
                      />
                    );
                  })}
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Comment
                </label>
                <div className="mt-2">
                  <textarea
                    placeholder="Review"
                    name="coment"
                    value={newReview.coment}
                    onChange={handlerNewReview}
                    className="textarea textarea-bordered textarea-xs w-[400px] max-w-xs"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end ...">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </dialog>
      <div className={style.reviews}>
        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title text-center text-xl font-medium">
            Reviews
          </div>
          <div className="collapse-content">
            {reviews.length > 0 ? (
              reviews?.map((elem) => {
                return (
                  <div key={elem._id} className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src={elem.id_user.image} />
                      </div>
                    </div>
                    <div className="chat-bubble">
                      <div className="badge badge-accent badge-outline mb-2">
                        <h1 className="color-black">{elem.id_user.user}</h1>
                      </div>

                      <p className="mb-3">{elem.coment}</p>
                      <div className="rating">
                        {stars.map((star) => {
                          return (
                            <input
                              key={star}
                              type="radio"
                              name={`rating-${elem._id}`} // Asignar un nombre único basado en el ID del elemento
                              className="mask mask-star-2 bg-orange-400"
                              defaultChecked={star <= elem.value}
                              disabled
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>No Reviews</h2>
            )}
          </div>
        </div>
      </div>

      <div className={style.contact}>
        <div className="info">
          <h2>Contact Us:</h2>
          <p>
            We're here to assist you! If you have any questions, comments, or
            special requests, feel free to reach out to us. We are committed to
            providing excellent customer service. Click the contact button
            below, and we will get back to you as soon as possible.
          </p>
          <button>Contact Us Now!</button>
        </div>
        <div className="contactMore">
          <div className="arrocito">
            <p>ABOUT US</p>
            <p>FAQ</p>
            <p>CONTACT</p>
          </div>
          <div className="costumers">
            <p>CUSTOMER SERVICE</p>
            <p>surra@car.com</p>
            <p>3203280463</p>
          </div>
          <div className="svgs">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_119_111)">
                <path
                  d="M29.5312 15C29.5312 6.97266 23.0273 0.46875 15 0.46875C6.97266 0.46875 0.46875 6.97266 0.46875 15C0.46875 22.2527 5.78262 28.2645 12.7295 29.3555V19.2006H9.03809V15H12.7295V11.7984C12.7295 8.15684 14.8975 6.14531 18.218 6.14531C19.8082 6.14531 21.4711 6.42891 21.4711 6.42891V10.0031H19.6383C17.8336 10.0031 17.2705 11.1234 17.2705 12.2725V15H21.3006L20.6561 19.2006H17.2705V29.3555C24.2174 28.2645 29.5312 22.2527 29.5312 15Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_119_111">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_119_106)">
                <path
                  d="M15.0071 8.63672C10.7481 8.63672 7.31288 11.6426 7.31288 15.3691C7.31288 19.0957 10.7481 22.1016 15.0071 22.1016C19.266 22.1016 22.7013 19.0957 22.7013 15.3691C22.7013 11.6426 19.266 8.63672 15.0071 8.63672ZM15.0071 19.7461C12.2548 19.7461 10.0048 17.7832 10.0048 15.3691C10.0048 12.9551 12.2481 10.9922 15.0071 10.9922C17.766 10.9922 20.0093 12.9551 20.0093 15.3691C20.0093 17.7832 17.7593 19.7461 15.0071 19.7461V19.7461ZM24.8106 8.36133C24.8106 9.23437 24.0071 9.93164 23.016 9.93164C22.0182 9.93164 21.2213 9.22852 21.2213 8.36133C21.2213 7.49414 22.0249 6.79102 23.016 6.79102C24.0071 6.79102 24.8106 7.49414 24.8106 8.36133ZM29.9066 9.95508C29.7928 7.85156 29.2437 5.98828 27.4825 4.45312C25.728 2.91797 23.5986 2.4375 21.1946 2.33203C18.7169 2.20898 11.2906 2.20898 8.81288 2.33203C6.41556 2.43164 4.28609 2.91211 2.52494 4.44727C0.763776 5.98242 0.221366 7.8457 0.10083 9.94922C-0.0397949 12.1172 -0.0397949 18.6152 0.10083 20.7832C0.214669 22.8867 0.763776 24.75 2.52494 26.2852C4.28609 27.8203 6.40886 28.3008 8.81288 28.4062C11.2906 28.5293 18.7169 28.5293 21.1946 28.4062C23.5986 28.3066 25.728 27.8262 27.4825 26.2852C29.237 24.75 29.7861 22.8867 29.9066 20.7832C30.0472 18.6152 30.0472 12.123 29.9066 9.95508V9.95508ZM26.7057 23.1094C26.1834 24.2578 25.1722 25.1426 23.853 25.6055C21.8776 26.291 17.1901 26.1328 15.0071 26.1328C12.824 26.1328 8.12984 26.2852 6.16109 25.6055C4.84859 25.1484 3.83743 24.2637 3.30842 23.1094C2.52494 21.3809 2.70574 17.2793 2.70574 15.3691C2.70574 13.459 2.53163 9.35156 3.30842 7.62891C3.83074 6.48047 4.8419 5.5957 6.16109 5.13281C8.13654 4.44727 12.824 4.60547 15.0071 4.60547C17.1901 4.60547 21.8843 4.45312 23.853 5.13281C25.1655 5.58984 26.1767 6.47461 26.7057 7.62891C27.4892 9.35742 27.3084 13.459 27.3084 15.3691C27.3084 17.2793 27.4892 21.3867 26.7057 23.1094Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_119_106">
                  <rect
                    width="30"
                    height="30"
                    fill="white"
                    transform="translate(0 0.375)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.6278 7.64549C28.3007 6.25975 27.3368 5.16838 26.113 4.79801C23.8948 4.125 15 4.125 15 4.125C15 4.125 6.10516 4.125 3.88688 4.79801C2.66308 5.16844 1.69922 6.25975 1.37209 7.64549C0.77771 10.1572 0.77771 15.3977 0.77771 15.3977C0.77771 15.3977 0.77771 20.6382 1.37209 23.15C1.69922 24.5357 2.66308 25.5816 3.88688 25.952C6.10516 26.625 15 26.625 15 26.625C15 26.625 23.8948 26.625 26.113 25.952C27.3368 25.5816 28.3007 24.5357 28.6278 23.15C29.2222 20.6382 29.2222 15.3977 29.2222 15.3977C29.2222 15.3977 29.2222 10.1572 28.6278 7.64549V7.64549ZM12.0908 20.1557V10.6397L19.5252 15.3979L12.0908 20.1557V20.1557Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
