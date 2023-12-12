import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { getPaginateUsers, deleteOneUser } from "../../Services/Apis";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import "./Users.css";

const Users = () => {
  const [spiner, setSpiner] = useState(false);
  //const [page, setPage] = useState(1);
  const [totalUser, setTotalUsers] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const page = useRef();

  async function handlePageClick(e) {
    //console.log(e);
    page.current = e.selected + 1;
    getPaginatedUsers();
  }

  async function getPaginatedUsers() {
    setSpiner(true);
    const data = { page: page.current, limit, search };
    const response = await getPaginateUsers(data);

    if (response.status === 200) {
      setSpiner(false);
      console.log("Data of all the users: ", response.data);
      setPageCount(response.data.pageCount);
      //console.log("Page count is: ", response.data.pageCount);
      setData(response.data.result);
      setTotalUsers(response.data.totalUser);
    }
    if (response.status === 201) {
      setSpiner(false);
      console.log("Data of individual user: ", response.data);
      setData(response.data);
    }
  }

  function changeLimit() {
    page.current = 1;
    getPaginatedUsers();
  }

  const handleDeleteClick = async (index) => {
    const response = await deleteOneUser({ index });

    if (response.status === 200) {
      //console.log(response.data.message);
      toast.success(response.data.message);
      window.location.reload();
    } else if (response.status === 404) {
      toast.error(response.data.message);
    } else {
      toast.error(response.data);
    }
  };

  useEffect(() => {
    page.current = 1;
    getPaginatedUsers();
  }, []);

  return (
    <div className="container my-5 px-5">
      <div className="my-4 actions-style d-flex align-items-center justify-content-between">
        <div className="text-decoration my-3">Total Users: {totalUser}</div>
        <div className="my-3">
          <input
            type="text"
            className="input-group text-muted"
            placeholder="Limit"
            onChange={(e) => setLimit(e.target.value)}
            value={limit}
          />
          <button
            onClick={changeLimit}
            className="mx-3 btn btn-outline-primary"
          >
            Set Limit
          </button>
        </div>
        <div className="my-3">
          <input
            class="input-group text-muted"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            class="mx-3 btn btn-outline-primary"
            type="submit"
            onClick={changeLimit}
          >
            Search
          </button>
        </div>
      </div>
      {spiner ? (
        <div className="text-center my-5">
          Loading <Spinner animation="border" />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={index}>
                <td>{value.email}</td>
                <td>{value.fname}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteClick(value._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        forcePage={page.current - 1}
      />
      <ToastContainer />
    </div>
  );
};

export default Users;
