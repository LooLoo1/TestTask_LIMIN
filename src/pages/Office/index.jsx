import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import ProducktItem from "../../components/ProducktItem";
import { logout } from "../../firebase";
import { logoutAction } from "../../store/authReducer";

import "./office.scss";

function Office() {
  const { list } = useSelector((state) => state.basketReducer);
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="office">
      <div className="info">
        <div>
          <Avatar />
          <Button
            onClick={() => {
              logout();
              dispatch(logoutAction());
              navigate("/");
            }}
          >
            Log Out
          </Button>
        </div>
        {user && <p>Last log in {user.lastSignInTime.slice(18, 22)}</p>}
      </div>
      <div className="filter-list">
        {list.map((e, i) => (
          <ProducktItem key={`${e.i} ${i}`} data={e} index={e.time} />
        ))}
      </div>
    </div>
  );
}

export default Office;
