import React, { useEffect, useState } from "react";
import { userData, getMsg, getTestimonials } from "../../Services/Apis";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import MessageStructure from "./MessageStructure";
import Testimonial from "../Testimonial/Testimonial";
import Spinner from "react-bootstrap/Spinner";

export default function Messages() {
  const [spiner, setSpiner] = useState(false);
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [data, setData] = useState({});
  const [messageData, setMessageData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);

  const userToken = sessionStorage.getItem("userdbtoken");
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSpiner(true);
        const getUserData = await userData({ token: userToken });

        if (getUserData.status === 200) {
          setData(getUserData.data.data);
          //console.log("User data is: ", data);
          //console.log("User data Email is: ", data.email);

          const allMessage = await getMsg({
            email: data.email || "vishalkumar.yadav2021a@vitstudent.ac.in",
          });

          const alltestimonial = await getTestimonials({
            request: true,
          });
          if (allMessage.status === 200) {
            setSpiner(false);
            console.log("All user messages: ", allMessage.data.dataArray);
            setMessageData(allMessage.data.dataArray);
          }
          if (alltestimonial.status === 200) {
            setSpiner(false);
            console.log(
              "All user Testimonials: ",
              alltestimonial.data.dataArray
            );
            setTestimonialData(alltestimonial.data.dataArray);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Check if the user is logged in before making the API call
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, userToken]);

  return (
    <>
      <MDBTabs justify className="mb-3 container my-5">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Messages
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Testimonial
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={justifyActive === "tab1"}>
          {messageData.length === 0 ? (
            <h1 className="text-center">No Message To Display</h1>
          ) : (
            messageData.map((message, index) => (
              <MessageStructure
                key={index}
                index={message._id}
                name={message.fname}
                email={message.email}
                message={message.msg}
              />
            ))
          )}
        </MDBTabsPane>
        <MDBTabsPane open={justifyActive === "tab2"}>
          {spiner ? (
            <div className="text-center my-5" style={{ color: "black" }}>
              Loading <Spinner animation="border" />
            </div>
          ) : testimonialData.length === 0 ? (
            <h1 className="text-center">No Testimonial To Display</h1>
          ) : (
            testimonialData.map((message, index) => (
              <Testimonial
                key={index}
                index={message._id}
                name={message.fname}
                email={message.email}
                message={message.msg}
              />
            ))
          )}
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}
