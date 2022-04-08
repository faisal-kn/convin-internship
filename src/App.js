import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styles from "./App.module.css";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./LoadingIndicator";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const { promiseInProgress } = usePromiseTracker();

  const dataHandler = (data) => {
    dispatch({ type: "dataLoaded", payload: data });
  };

  const [currentUserData, setCurrentUserData] = useState();

  useEffect(() => {
    let res = [];
    async function fetchData() {
      const options = {
        url: "https://reqres.in/api/users",
        method: "GET",
      };
      res = await axios(options);
      dataHandler(res);
    }

    fetchData();
  }, []);

  const showUserData = async (id) => {
    const options = {
      url: `https://reqres.in/api/users/${id}`,
      method: "GET",
    };
    const currentUser = await trackPromise(axios(options));
    setCurrentUserData(currentUser.data.data);
    console.log(currentUser);
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Users in the database</h2>
        {promiseInProgress ? (
          <LoadingIndicator />
        ) : currentUserData ? (
          <div className={styles["user-container"]}>
            <span style={{ paddingBottom: "20px" }}>
              <h3>Information about current User</h3>
            </span>
            <img
              src={currentUserData.avatar}
              alt=""
              style={{ height: "300px", borderRadius: "20px" }}
            />
            <span style={{ paddingTop: "10px" }}>
              {currentUserData.first_name} {currentUserData.last_name}
            </span>
            <span></span>
            <span>{currentUserData.email}</span>
          </div>
        ) : (
          <div className={styles["user-container"]}>
            Click any of the button to get information about user
          </div>
        )}
        <div className={styles["button-container"]}>
          {data.data.data.length > 0 &&
            data.data.data.map((userData, i) => (
              <span key={i} className={styles.btn}>
                <button
                  className={styles.button}
                  onClick={() => showUserData(userData.id)}
                >{`User ${i + 1}`}</button>
              </span>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
