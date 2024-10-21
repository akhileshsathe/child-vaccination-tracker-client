import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FormInput from "../components/FormInput";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { notifyToast } from "../functions/notifyToast";

function VaccineEditor() {
  const { state } = useLocation();
  const [mode, setMode] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [vStartRangePost, setvStartRangePost] = useState();
  const [vEndRangePost, setvEndRangePost] = useState();

  const [values, setValues] = useState({
    vName: "",
    vShortName: "",
    vSideEffects: "",
    vStartRangeNumber: "",
    vStartRangePost: "",
    vEndRangeNumber: "",
    vEndRangePost: "",
    medium: "",
    vDiseasePrevented: "",
    vDesc: "",
    vSortVar: "",
    mode,
  });

  let name, value;

  // const handleStartRange = (event) => {
  //   setvStartRangePost(event.target.value);
  //   console.log(vStartRangePost)
  // };
  // const handleEndRange = (event) => {
  //   setvEndRangePost(event.target.value);
  //   console.log(vStartRangePost)
  // };
  const validate = () => {
    if (values.vName.length < 1) {
      notifyToast("Vaccine Name cannot be empty.");
      return false;
    } else if (values.vShortName.length < 1) {
      notifyToast("Vaccine Short Name cannot be empty.");
      return false;
    } else if (values.medium.length < 1) {
      notifyToast("Medium cannot be empty.");
      return false;
    } else if (values.vDiseasePrevented.length < 1) {
      notifyToast("End Range cannot be empty.");
      return false;
    } else if (values.vDesc.length < 1) {
      notifyToast("End Range cannot be empty.");
      return false;
    } else return true;
  };
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    //console.log(values);
  };

  const handleSubmit = (e) => {
    if (!validate()) return;
    console.log("submitting");
    e.preventDefault();

    const {
      _id,
      vName,
      vShortName,
      vSideEffects,
      vStartRangeNumber,
      vStartRangePost,
      vEndRangeNumber,
      vEndRangePost,
      medium,
      vDiseasePrevented,
      vDesc,
      vSortVar,
    } = values;
    const vSideEffectsSplit=()=>{
      try{
      return values.vSideEffects.split(";")}
      catch{
        return values.vSideEffects
      }
    }
    const LabelInDays=(label)=>{
      switch(label){
        case "At Birth":return 0;
        case "Days":return 1;
        case "Weeks":return 7
        case "Months":return 30
        case "Years":return 365
        default:return 0;
      }
    }
    console.log(vStartRangeNumber*LabelInDays)
    const response = fetch("/addVaccine", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        vName,
        vShortName,
        vSideEffects:vSideEffectsSplit(),
        vStartRangeNumber,
        vStartRangePost,
        vEndRangeNumber,
        vEndRangePost,
        medium,
        vDiseasePrevented,
        vDesc,
        vSortVar:
          vStartRangeNumber*LabelInDays(vStartRangePost),
        vEndVar:
        vEndRangeNumber*LabelInDays(vEndRangePost),
        mode,
      }),
    });
    //   response  .then(res => res.json())
    //   .then(json => console.log(json))
    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Vaccine successfully", "success");
          break;
        }
        case 400: {
          res.json().then((json) => {
            json.error.forEach((error) => {
              notifyToast(error.msg);
            });
          });
          break;
        }
        case 500: {
          notifyToast("There was some problem");
          break;
        }
        default:
          break;
      }
    });
  };

  useEffect(() => {
    try {
      setValues(state.item);
      setMode("update");
      console.log(" z");
    } catch (e) {
      if (state == null) {
        console.log(" y");
        setMode("add");
      }
    }

    setLoading(false);
    //console.log(values)
    const userType = localStorage.getItem("userType");
    if (userType != "a") {
      switch (userType) {
        case "v":
          notifyToast("Unauthorised", "error");
          navigate("/vcdash");
          break;
        case "vu":
          notifyToast("Unauthorised", "error");
          navigate("/vcdash");
          break;
        case "vr":
          notifyToast("Unauthorised", "error");
          navigate("/vcdash");
          break;
        case "vrr":
          notifyToast("Unauthorised", "error");
          navigate("/vcdash");
          break;
        case "p":
          notifyToast("Unauthorised", "error");
          navigate("/ParentHome");
          break;
        default:
          notifyToast("Login First", "error");
          localStorage.setItem("userType", "UNKNOWN");
          navigate("/login");
          break;
      }
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="auth-background belowNav">
      <div className="absolute-right ">
        <form className="reg-form" onSubmit={handleSubmit}>
          <h1 className="st">Vaccine Details</h1>
          <div className="flex-row">
            <FormInput
              type="text"
              name="vName"
              placeholder="Vaccine Name"
              labeltext="Vaccine Name:"
              //inputIcon="escalator_warning"
              handleChange={handleChange}
              value={values.vName}
            />

            <FormInput
              type="text"
              name="vShortName"
              placeholder="Vaccine Short Name"
              labeltext="Vaccine Name:"
              //inputIcon="escalator_warning"
              handleChange={handleChange}
              value={values.vShortName}
            />
          </div>
          <div className="flex-row">
            <div className="flex-item">
              <label className="secondary" htmlFor="vDesc">
                Start Range:
                <div className="iconInputContainer">
                  {/* <span className="material-symbols-outlined formicon">{inputIcon}</span> */}
                  <input
                    className="Form-input name"
                    placeholder="Start Range Number"
                    type="number"
                    name="vStartRangeNumber"
                    value={values.vStartRangeNumber}
                    onChange={handleChange}
                  />
                  <select
                    onChange={handleChange}
                    defaultValue={values.vStartRangePost}
                    className="Form-input name form-select"
                    name="vStartRangePost"
                  >
                    <option value="At Birth">At Birth</option>
                    <option value="Days">Days</option>
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                    <option value="Years">Years</option>
                  </select>
                </div>
              </label>
            </div>

            <div className="flex-item">
              <label className="secondary" htmlFor="vDesc">
                End Range:
                <div className="iconInputContainer">
                  {/* <span className="material-symbols-outlined formicon">{inputIcon}</span> */}
                  <input
                    className="Form-input name"
                    placeholder="End Range Number"
                    type="number"
                    name="vEndRangeNumber"
                    value={values.vEndRangeNumber}
                    onChange={handleChange}
                  />
                  <select
                    onChange={handleChange}
                    value={values.vEndRangePost}
                    className="Form-input name form-select"
                    name="vEndRangePost"
                  >
                    <option value="At Birth">At Birth</option>
                    <option value="Days">Days</option>
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                    <option value="Years">Years</option>
                  </select>
                </div>
              </label>
            </div>
            {/* <FormInput
              type="text"
              name="vStartRange"
              placeholder="Age Start Range"
              labeltext="Age Start Range:"
              //inputIcon="escalator_warning"
              handleChange={handleChange}
              value={values.vStartRange}
            /> */}
          </div>
          <div className="flex-row">
            {/* <FormInput
              type="text"
              name="vEndRange"
              placeholder="Age End Range"
              labeltext="Age End Range:"
              //inputIcon="escalator_warning"
              handleChange={handleChange}
              value={values.vEndRange}
            /> */}
            <FormInput
              type="text"
              name="vDiseasePrevented"
              placeholder="Disease Prevented"
              labeltext="Disease Prevented:"
              //inputIcon="escalator_warning"
              handleChange={handleChange}
              value={values.vDiseasePrevented}
            />
            <FormInput
              type="text"
              name="medium"
              placeholder="Medium"
              labeltext="Medium:"
              // inputIcon="escalator_warning"
              handleChange={handleChange}
              value={values.medium}
            />
          </div>
          <div className="flex-item">
            <label className="secondary" htmlFor="vDesc">
              Vaccine Side Effects:
              <div className="iconInputContainer">
                {/* <span className="material-symbols-outlined formicon">{inputIcon}</span> */}
                <textarea
                  style={{ width: "850px", height: "120px" }}
                  className="Form-input name"
                  defaultValue={[...values.vSideEffects].join(";")}
                  name="vSideEffects"
                  placeholder="Vaccine Side Effects (use ; to separate each side effect)"
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>

          <div className="flex-item">
            <label className="secondary" htmlFor="vDesc">
              Vaccine Description:
              <div className="iconInputContainer">
                {/* <span className="material-symbols-outlined formicon">{inputIcon}</span> */}
                <textarea
                  style={{ width: "850px", height: "120px" }}
                  className="Form-input name"
                  defaultValue={values.vDesc}
                  name="vDesc"
                  placeholder="Vaccine Description"
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>

          <input type="submit" className="btn" value={mode=="add"?"Add":"update"} />
        </form>
      </div>
    </div>
  );
}

export default VaccineEditor;
