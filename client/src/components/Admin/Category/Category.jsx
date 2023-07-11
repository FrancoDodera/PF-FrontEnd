import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, deleteCategory, getAllCategories,updateCategory} from "../../../redux/actions";
import style from '../Category/Category.module.css';
const Category = () => {
  //redux
  const categories = useSelector((state) => state.allCategories);
  const dispatch = useDispatch();

  //estados
  const [form, setForm] = useState({
    ID:null,
    Name: "",
    Description: "",
    Action:''
  });
  const [showModal, setShowModal] = useState(false);

  const handlerForm = (event) => {
    const { value } = event.target;
    setForm({ ...form, [event.target.name]: value });
  };
  const handlerSubmit = (event) => {
    event.preventDefault();
    if(form.Action=='Create'){
      dispatch(createCategory(form));
    }else{
      dispatch(updateCategory(form));
    }
    closeModalCategory();
  };
  const handlerDeleteCategory=(ID)=>{
    dispatch(deleteCategory(ID))
  }
  const showModalCategory = () => {
    setForm({...form,Accion:'Create'})
    setShowModal(true);
  };
  const showModalUpdateCategory = (element) => {
    setForm({...element,Accion:'Edit'});
    setShowModal(true);
  };
  const closeModalCategory = () => {
    setShowModal(false);
    setForm({
      ID:null,
      Name: "",
      Description: "",
      Action:''
    });
  };
  useEffect(() => {
    if(categories.length==0){
      dispatch(getAllCategories());
    } 
  }, []);
  return (
    <div className={style.all}>
      <div className={style.all}>
        <h1 className={style.h1}>Categories</h1>
        <button className=
        {style.create} onClick={showModalCategory}>
          Create Category
        </button>
      </div>

      <dialog
        id="my_modal_3"
        className={showModal ? "modal modal-open" : "modal"}
      >
        <form
          onSubmit={handlerSubmit}
          method="dialog"
          className="modal-box w-11/12 max-w-5xl"
        >
          <button
            type="button"
            onClick={closeModalCategory}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Create category</h3>
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div className="sm:col-span-2">
                <label
                  htmlFor="Nombre"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    value={form.Name}
                    onChange={handlerForm}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="Descripcion"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="Description"
                    name="Description"
                    value={form.Description}
                    onChange={handlerForm}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end ...">
            <button type="submit" className="btn btn-success">
             SAVE
            </button>
          </div>
        </form>
      </dialog>
      <table className="table">
        <thead>
          <tr>
            <th className="w-[10%]"></th>
            <th className="w-[20%]">NAME</th>
            <th className="w-[50%]">DESCRIPTION</th>
            <th className="w-[20%]">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((element) => {
            return (
              <tr key={element.ID}>
                <th>{element.ID}</th>
                <th>{element.Name}</th>
                <th>{element.Description}</th>
                <th>
                    <div className="btn-group">
                      <button className={style.b1} onClick={()=>showModalUpdateCategory(element)}>Edit</button>
                      <button className={style.b2} onClick={()=>handlerDeleteCategory(element.ID)}>Eliminate</button>
                    </div>
                </th>
              </tr>
            );
          })}
        </tbody>
        
      </table>
    </div>
  );
};
export default Category;
